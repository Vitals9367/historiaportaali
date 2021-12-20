<?php

namespace Drupal\helhist_node_resave\Batch;

use Drupal\node\Entity\Node;

/**
 * Node Resave batch.
 *
 *   See https://git.drupalcode.org/project/drupal/blob/8.7.8/core/includes/form.inc#L556-668
 *   for detailed information on batch processing.
 *
 * @package Drupal\helhist_node_resave\Batch
 */
class NodeResaveBatch {

  /**
   * Resave nodes.
   *
   * @param array $chunk
   *   An array of node IDs.
   * @param array $context
   *   A batch context array.
   *
   * @throws \Drupal\Core\Entity\EntityStorageException
   */
  public static function batchOperation(array $chunk, array &$context) {
    foreach ($chunk as $nid) {
      $latest_revision_nid = \Drupal::entityTypeManager()->getStorage('node')->getLatestRevisionId($nid);
      $node = \Drupal::entityTypeManager()->getStorage('node')->loadRevision($latest_revision_nid);

      if (!$node->moderation_state->value) {
        $created = $node->getCreatedTime();
        $node->setNewRevision(FALSE);
        $node->save();

        if ($node->isPublished()) {
          $node->set('moderation_state', 'published');
        } else {
          $node->set('moderation_state', 'draft');
        }

        $node->setCreatedTime($changed);
        $node->setNewRevision(FALSE);
        $node->save();
      }

      $context['results'][] = $nid;
    }
  }

  /**
   * Handle batch completion.
   *
   * @param bool $success
   *   TRUE if all batch API tasks were completed successfully.
   * @param array $results
   *   An array of resaved node IDs.
   * @param array $operations
   *   A list of the operations that had not been completed.
   */
  public static function batchFinished($success, array $results, array $operations) {
    $messenger = \Drupal::messenger();

    if ($success) {
      $messenger->addMessage(t('Resaved @count nodes.', [
        '@count' => count($results),
      ]));
    }
    else {
      // An error occurred.
      // $operations contains the operations that remained unprocessed.
      $error_operation = reset($operations);
      $message = t('An error occurred while processing %error_operation with arguments: @arguments', [
        '%error_operation' => $error_operation[0],
        '@arguments' => print_r($error_operation[1], TRUE),
      ]);
      $messenger->addError($message);
    }
  }

}

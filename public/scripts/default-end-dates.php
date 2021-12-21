<?php

use Drupal\node\Entity\Node;
use Drupal\media\Entity\Media;

$nids = \Drupal::entityQuery('node')->condition('type', 'article')->accessCheck(FALSE)->execute();
$mids = \Drupal::entityQuery('media')->condition('bundle', 'image')->accessCheck(FALSE)->execute();

foreach ($nids as $nid) {

  $node = Node::load($nid);

  if (!is_null($node->field_start_year->value) && is_null($node->field_end_year->value)) {
    echo(var_dump($nid));
    $node->field_end_year->value = $node->field_start_year->value;
    // Save old changed time value.
    $changed = $node->getChangedTime();
    $node->setNewRevision(FALSE);
    $node->save();
    // Set back to the original changed time.
    $node->setChangedTime($changed);
    $node->setNewRevision(FALSE);
    $node->save();
  }
}

foreach ($mids as $mid) {

  $media = Media::load($mid);

  if (!is_null($media->field_start_year->value) && is_null($media->field_end_year->value)) {
    echo(var_dump($mid));
    $media->field_end_year->value = $media->field_start_year->value;
    // Save old changed time value.
    $changed = $media->getChangedTime();
    $media->setNewRevision(FALSE);
    $media->save();
    // Set back to the original changed time.
    $media->setChangedTime($changed);
    $media->setNewRevision(FALSE);
    $media->save();
  }
}

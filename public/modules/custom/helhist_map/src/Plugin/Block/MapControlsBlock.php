<?php

/**
 * @file
 * Contains \Drupal\helhist_map\Plugin\Block\MapControlsBlock.
 */

namespace Drupal\helhist_map\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\node\Entity\Node;

/**
 * Provides a Map Controls block
 *
 * @Block(
 *   id = "helhist_map_map_controls_block",
 *   admin_label = @Translation("HelHist Map Controls"),
 *   category = @Translation("HelHist")
 * )
 */
class MapControlsBlock extends BlockBase {
  /**
   * {@inheritdoc}
   */
  public function build() {
    $build = [
      '#theme' => 'map_controls',
      '#map_layers' => $this->getMapLayers()
    ];

    return $build;
  }

  private function getMapLayers() {
    $query = \Drupal::entityTypeManager()
      ->getListBuilder('node')
      ->getStorage()
      ->getQuery();
    $query->condition('type', 'map_layer');
    $query->condition('status', 1);
    $query->sort('field_layer_title', 'DESC');

    $map_layer_nids = $query->execute();
    
    if (empty($map_layer_nids)) {
      return [];
    }

    $map_layer_nodes = Node::loadMultiple($map_layer_nids);

    $layers = [];
    foreach ($map_layer_nodes as $node) {
      $layer_title = $node->get('field_layer_title')->getString();
      $map_layer_api_endpoints_field = $node->get('field_map_api_endpoints');

      $layer_api_endpoints = [];
      foreach ($map_layer_api_endpoints_field as $endpoint) {
        $endpoint_paragraph = $endpoint->entity;

        $layer_api_endpoints[] = [
          'map_api' => $endpoint_paragraph->get('field_map_api')->getString(),
          'wms_title' => $endpoint_paragraph->get('field_map_wms_title')->getString()
        ];
      }

      $layers[$layer_title] = [
        'layer_title' => $layer_title,
        'map_api_endpoints' => json_encode($layer_api_endpoints)
      ];
    }

    return $layers;
  }
}

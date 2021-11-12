<?php

/**
 * @file
 * Contains \Drupal\helhist_search\Plugin\Block\HeaderSearchBlock.
 */

namespace Drupal\helhist_search\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a Header Search block
 *
 * @Block(
 *   id = "helhist_search_header_search_block",
 *   admin_label = @Translation("HelHist Header Search"),
 *   category = @Translation("HelHist")
 * )
 */
class HeaderSearchBlock extends BlockBase {
  /**
   * {@inheritdoc}
   */
  public function build() {
    $build = [
      '#theme' => 'header_search'
    ];

    return $build;
  }
}

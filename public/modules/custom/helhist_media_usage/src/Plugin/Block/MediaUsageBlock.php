<?php

namespace Drupal\helhist_media_usage\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\DependencyInjection\ClassResolverInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\Url;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Provides a Media Usage block.
 *
 * @Block(
 *   id = "helhist_media_usage_block",
 *   admin_label = @Translation("HelHist Media Usage"),
 *   category = @Translation("HelHist")
 * )
 */
class MediaUsageBlock extends BlockBase implements ContainerFactoryPluginInterface {

  /**
   * Class Resolver service.
   *
   * @var \Drupal\Core\DependencyInjection\ClassResolverInterface
   */
  protected $classResolver;

  /**
   * Constructs a new ControllerBlock object.
   *
   * @param array $configuration
   *   A configuration array containing information about the plugin instance.
   * @param string $plugin_id
   *   The plugin_id for the plugin instance.
   * @param string $plugin_definition
   *   The plugin implementation definition.
   * @param \Drupal\Core\DependencyInjection\ClassResolverInterface $class_resolver
   *   The class resolver service.
   */
  public function __construct(
    array $configuration,
    $plugin_id,
    $plugin_definition,
    ClassResolverInterface $class_resolver
  ) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->classResolver = $class_resolver;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('class_resolver')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function build() {
    $media = \Drupal::routeMatch()->getParameter('media');

    // listUsagePage is a public function that returns ListUsageController output.
    $controller = $this->classResolver->getInstanceFromDefinition('\Drupal\entity_usage\Controller\ListUsageController');
    $data = $controller->listUsagePage('media', $media->id());

    // Get entity usage table rows from output.
    $rows = $data[0]['#rows'];
    $content = [];

    foreach ($rows as $row) {
      // Get link from entity usage table column.
      $link = $row[0];
      if (!is_null($link)) {
        // Get node from link url.
        $url = $link->getUrl()->toString();
        // Strip langcode.
        $url = substr($url, 3);
        $language = \Drupal::languageManager()->getCurrentLanguage()->getId();
        $url_path = \Drupal::service('path_alias.manager')->getPathByAlias($url, $language);
        // If alias exists, we can extract node ID from path.
        if(preg_match('/node\/(\d+)/', $url_path, $matches)) {
          $node = \Drupal\node\Entity\Node::load($matches[1]);
        }
        if (!is_null($node)) {
          // Filter duplicates (old revisions, same media in liftup and content) and non-articles.
          if (!in_array($node->id(), $content) && $node->getType() == 'article') {
            $content[] = $node->id();
          }
        }
      }
    }

    return [
      '#theme' => 'media_usage_block',
      '#content' => $content,
      '#cache' => [
        'max-age' => 0,
      ]
    ];
  }

}

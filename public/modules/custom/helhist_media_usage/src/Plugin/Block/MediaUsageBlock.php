<?php

namespace Drupal\helhist_media_usage\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\DependencyInjection\ClassResolverInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
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
    // ListUsageController is a public function that returns the controller output.
    $controller = $this->classResolver->getInstanceFromDefinition('\Drupal\entity_usage\Controller\ListUsageController');
    $data = $controller->listUsagePage('media', $media->id());

    // TODO: handle multiple usage rows.
    $rows = $data[0]['#rows'];

    $link = $data[0]['#rows'][0][0];
                           // ^ 1st row
                              // ^ the link

    // Get node title and replace link text with it.
    if (!is_null($link)) {
      $url = $link->getUrl()->toString();
      $url_params = \Drupal\Core\Url::fromUserInput($url)->getRouteParameters();
      $nid = $url_params['node'];
      $node_title = \Drupal\node\Entity\Node::load($nid)->getTitle();
      $link->setText($node_title);
    }

    return [
      '#theme' => 'media_usage_block',
      '#content' => $link,
      '#cache' => [
        'max-age' => 0,
      ]
    ];
  }

}

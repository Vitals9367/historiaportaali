<?php

namespace Drupal\helhist_search\EventSubscriber;

use Drupal\search_api\Event\ProcessingResultsEvent;
use Drupal\search_api\Event\SearchApiEvents;
use Drupal\views\ViewExecutable;
use Drupal\views\Views;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

/**
 * Class EntityTypeSubscriber.
 *
 * @package Drupal\helhist_search\EventSubscriber
 */
class ProcessingResultsEventSubscriber implements EventSubscriberInterface {

  /**
   * @param \Drupal\search_api\Event\ProcessingResultsEvent $event
   */
  public function combineMapEntities(ProcessingResultsEvent $event) {
    
    $messenger = \Drupal::messenger();

    $results = $event->getResults();
    $query = $results->getQuery();

    if (!$query->hasTag('media_query')) {

      $messenger->addStatus("{$results->getResultCount()}");
      $messenger->addStatus("{$event->getResults()}");

      $index = \Drupal\search_api\Entity\Index::load('content_and_media');
      $media_query = $index->query();
      $media_query->addTag('media_query');
      $media_query->setOption('search_api_view', Views::getView('media_map'));
      $media_results = $media_query->execute();

      $messenger->addWarning("{$media_results->getResultCount()}");
      $messenger->addWarning("{$media_query->getResults()}");

      $event->setResults($media_query->getResults());
      $results->setResultCount($media_results->getResultCount());
      $results->setResultItems($media_results->getResultItems());

      $messenger->addError("{$results->getResultCount()}");
      $messenger->addError("{$event->getResults()}");
    }
  }

  /**
   * {@inheritdoc}
   *
   * @return array
   *   The event names to listen for, and the methods that should be executed.
   */
  public static function getSubscribedEvents() {
    return [
      SearchApiEvents::PROCESSING_RESULTS => 'combineMapEntities',
    ];
  }

}

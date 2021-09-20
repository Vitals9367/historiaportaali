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
class ProcessingResultsEventsSubscriber implements EventSubscriberInterface {

  /**
   * @param \Drupal\search_api\Event\ProcessingResultsEvent $event
   */
  public function combineMapEntities(ProcessingResultsEvent $event) {
    
    $messenger = \Drupal::messenger();

    $results = $event->getResults();
    $query = $results->getQuery();
    $view_id = $query->getOption('search_api_view')->id();

    // View -> getSearchApiQuery doesn't work
    if ($view_id == 'combined_map') {
      $media_view = Views::getView('media_map');
      $media_view->setDisplay('page_1');
      $media_view->build();
      $media_query = $media_view->query->getSearchApiQuery();
      $media_results = $media_query->execute();

      // Unnecessary
      //$event->setResults($media_results);

      $results->setResultItems($media_results->getResultItems());
      $results->setResultCount($media_results->getResultCount());

      // These do work?!?!
      //$results->setResultItems([]);
      //$results->setResultCount('0');
    }

    // Index -> search_api_view doesn't work
    if ($view_id == 'combined_map') {
      $index = \Drupal\search_api\Entity\Index::load('content_and_media');
      $media_query = $index->query();
      $media_query->setOption('search_api_view', Views::getView('media_map'));
      $media_results = $media_query->execute();

      // Unnecessary
      //$event->setResults($media_results);

      $results->setResultItems($media_results->getResultItems());
      $results->setResultCount($media_results->getResultCount());

      // These do work?!?!
      //$results->setResultItems([]);
      //$results->setResultCount('0');
    }

    $messenger->addStatus("{$results->getResultCount()}");
    $messenger->addStatus("{$event->getResults()}");
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

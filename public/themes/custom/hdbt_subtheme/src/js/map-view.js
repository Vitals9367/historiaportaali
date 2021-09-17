// eslint-disable-next-line no-unused-vars
(($, Drupal, drupalSettings) => {
  Drupal.behaviors.mapView = {
    attach: function(context, settings) {
      $(document).on('leaflet.map', function(e, settings, lMap, mapid) {
        
      });
    }
  };
  // eslint-disable-next-line no-undef
})(jQuery, Drupal, drupalSettings);

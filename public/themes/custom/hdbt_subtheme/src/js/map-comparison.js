// eslint-disable-next-line no-unused-vars
(($, Drupal, drupalSettings) => {
  let mainMap;
  let comparisonMap;

  Drupal.behaviors.mapComparison = {
    attach: function(context, settings) {
      let self = this;

      $(document).on('leaflet.map', function(e, settings, lMap, mapid) {
        mainMap = lMap;
        self.bindCompareButton();
      });
    },

    bindCompareButton: function() {
      let self = this;
      let $viewContainer = $('.views--combined-map');
      let $button = $('.map-controls__control #map-comparison-btn');

      $button.on('click', function(e) {
        if (!$viewContainer.is('.comparison-enabled')) {
          self.enableMapComparison();
        } else {
          self.disableMapComparison();
        }
      });
    },
    
    enableMapComparison: function() {
      let self = this;

      let $viewContainer = $('.views--combined-map');
      $viewContainer.addClass('comparison-enabled');

      $('#comparison-map-container').fadeIn(150);

      // Init comparison map
      comparisonMap = L.map('comparison-map-container', {
        center: mainMap.getCenter(),
        zoom: mainMap.getZoom(),
        zoomControl: false
      });

      mainMap.eachLayer(layer => {
        if (layer.hasOwnProperty('_tiles')) {
          L.tileLayer(layer._url, {
            attribution: layer.options.attribution
          }).addTo(comparisonMap);
        }
      });

      comparisonMap.on('layeradd', function(e) {
        console.log(comparisonMap);
      });

      self.bindMapEventHandlers();
    },

    disableMapComparison: function() {
      let self = this;
      let $viewContainer = $('.views--combined-map');

      $viewContainer.removeClass('comparison-enabled');
      $('#comparison-map-container').fadeOut(150);

      comparisonMap.remove();
      self.removeMapEventHandlers();
    },

    bindMapEventHandlers: function() {
      mainMap.on('move', function(ev) {
        comparisonMap.setView(mainMap.getCenter(), mainMap.getZoom());
      });
    },

    removeMapEventHandlers: function() {
      mainMap.off('move');
    }
  };
  // eslint-disable-next-line no-undef
})(jQuery, Drupal, drupalSettings);
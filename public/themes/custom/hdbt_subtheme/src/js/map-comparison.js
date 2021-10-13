// eslint-disable-next-line no-unused-vars
(($, Drupal, drupalSettings) => {
  Drupal.behaviors.mapComparison = {
    attach: function(context, settings) {
      let self = this;

      $(document).on('leaflet.map', function(e, settings, mainMap, mapid) {
        self.bindCompareButton(mainMap);
      });
    },

    bindCompareButton: function(mainMap) {
      let self = this;
      let $button = $('.map-controls__control #map-comparison-btn');

      $button.on('click', function(e) {
        $('#comparison-map-container').fadeIn(150);
        
        let mainMapOptions = mainMap.options;

        let comparisonMap = L.map('comparison-map-container', {
          center: [mainMapOptions.center.lat, mainMapOptions.center.lon],
          zoom: mainMapOptions.zoom,
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

        self.bindMapEventHandlers(mainMap, comparisonMap);
      });
    },

    bindMapEventHandlers: function(mainMap, comparisonMap) {
      mainMap.on('move', function(ev) {
        comparisonMap.setView(mainMap.getCenter(), mainMap.getZoom());
      });
    }
  };
  // eslint-disable-next-line no-undef
})(jQuery, Drupal, drupalSettings);
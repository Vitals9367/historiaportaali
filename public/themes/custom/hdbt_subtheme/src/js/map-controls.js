// eslint-disable-next-line no-unused-vars
(($, Drupal, drupalSettings) => {
  Drupal.behaviors.mapControls = {
    attach: function(context, settings) {
      $(document).on('leaflet.map', function(e, settings, lMap, mapid) {
        Drupal.behaviors.mapControls.bindEraControls(lMap);
      });
    },

    bindEraControls: function(lMap) {
      let $controls = $('.map-controls__map-era .map-controls__map-era-item');

      $controls.on('click', function(e) {
        let selectedEra = $(e.target).data('map-era');
        let mapWMSTitle = $(e.target).data('map-wms-title');

        Drupal.behaviors.mapControls.loadEraLayer(lMap, selectedEra, mapWMSTitle);

        $controls.removeClass('active');
        $(e.target).addClass('active');
      });
    },

    loadEraLayer: function(lMap, era, mapWMSTitle) {
      Drupal.behaviors.mapControls.removeMapEraLayers(lMap);

      if (mapWMSTitle && era !== 'present') {
        let mapLayer = L.tileLayer.wms('https://kartta.hel.fi/ws/geoserver/avoindata/wms', {
          layers: mapWMSTitle,
          format: 'image/png',
          transparent: true
        });

        mapLayer.addTo(lMap);
      }
    },

    removeMapEraLayers: function(lMap) {
      let eraLayers = Object.entries(lMap._layers).filter(([key, layer]) => layer.hasOwnProperty('wmsParams'));

      if (eraLayers.length > 0) {
        eraLayers.forEach(layer => layer[1].remove());
      }
    }
  };
  // eslint-disable-next-line no-undef
})(jQuery, Drupal, drupalSettings);

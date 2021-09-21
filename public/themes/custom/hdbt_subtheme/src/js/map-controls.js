// eslint-disable-next-line no-unused-vars
(($, Drupal, drupalSettings) => {
  Drupal.behaviors.mapControls = {
    attach: function(context, settings) {
      var self = this;

      $(document).on('leaflet.map', function(e, settings, lMap, mapid) {
        self.bindEraControls(lMap);
      });
    },

    bindEraControls: function(lMap) {
      var self = this;
      let $controls = $('.map-controls__map-era .map-controls__map-era-item');

      $controls.on('click', function(e) {
        let selectedEra = $(e.target).data('map-era')
            mapApi = $(e.target).data('map-api')
            mapWMSTitle = $(e.target).data('map-wms-title');

        self.loadEraLayer(lMap, selectedEra, mapApi, mapWMSTitle);

        $controls.removeClass('active');
        $(e.target).addClass('active');
      });
    },

    loadEraLayer: function(lMap, era, mapApi, mapWMSTitle) {
      var self = this;
      self.removeMapEraLayers(lMap);

      let mapApiUrl = self.getMapApiUrl(mapApi);

      if (mapWMSTitle && era !== 'present') {
        let mapLayer = L.tileLayer.wms(mapApiUrl, {
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
    },

    getMapApiUrl: function(mapApi) {
      switch (mapApi) {
        case 'kartta_hel_fi':
          return 'https://kartta.hel.fi/ws/geoserver/avoindata/wms';

        case 'geoserver_hel_fi':
          return 'http://geoserver.hel.fi/geoserver/ows';

        default:
          return '';
      }
    }
  };
  // eslint-disable-next-line no-undef
})(jQuery, Drupal, drupalSettings);

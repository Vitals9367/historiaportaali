// eslint-disable-next-line no-unused-vars
(($, Drupal, drupalSettings) => {
  Drupal.behaviors.mapControls = {
    attach: function(context, settings) {
      let self = this;

      $(document).on('leaflet.map', function(e, settings, lMap, mapid) {
        self.bindEraControls(lMap);
      });
    },

    bindEraControls: function(lMap) {
      let self = this;
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
      let self = this;

      let mapApiUrl = self.getMapApiUrl(mapApi);

      if (mapWMSTitle && era !== 'present') {
        self.showLoadingSpinner();

        let mapLayer = L.tileLayer.wms(mapApiUrl, {
          layers: mapWMSTitle,
          format: 'image/png',
          transparent: true
        });

        mapLayer.addTo(lMap);
        
        // Remove other layers after the new layer has loaded
        mapLayer.on('load', function(ev) {
          self.removeOtherMapLayers(lMap, mapLayer);
          self.hideLoadingSpinner();
        });
      }

      if (era == 'present') {
        self.removeOtherMapLayers(lMap, null);
      }
    },

    removeOtherMapLayers: function(lMap, newLayer) {
      let allMapLayers = Object.entries(lMap._layers).filter(([key, layer]) => layer.wmsParams?.layers);
      let layersToBeDeleted;

      // Remove all layers if the new layer isn't passed
      if (!newLayer) {
        layersToBeDeleted = allMapLayers;
      } else {
        layersToBeDeleted = allMapLayers.filter(([key, layer]) => layer.wmsParams.layers !== newLayer.wmsParams.layers);
      }
      
      if (layersToBeDeleted.length) {
        layersToBeDeleted.forEach(layer => layer[1].remove());
      }
    },

    getMapApiUrl: function(mapApi) {
      switch (mapApi) {
        case 'kartta_hel_fi':
          return 'https://kartta.hel.fi/ws/geoserver/avoindata/wms';

        case 'geoserver_hel_fi':
          return 'https://geoserver.hel.fi/geoserver/ows';

        default:
          return '';
      }
    },

    showLoadingSpinner: function() {
      $('#map-loading-overlay').fadeIn(150);
    },

    hideLoadingSpinner: function() {
      $('#map-loading-overlay').fadeOut(150);
    }
  };
  // eslint-disable-next-line no-undef
})(jQuery, Drupal, drupalSettings);

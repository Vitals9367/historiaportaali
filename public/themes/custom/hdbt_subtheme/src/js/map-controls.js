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
        let mapImageUrl = $(e.target).data('map-image-url');
        let layerBounds = $(e.target).data('map-bounds');

        Drupal.behaviors.mapControls.loadEraLayer(lMap, selectedEra, mapImageUrl, layerBounds);

        $controls.removeClass('active');
        $(e.target).addClass('active');
      });      
    },

    loadEraLayer: function(lMap, era, mapImageUrl, layerBounds) {
      Drupal.behaviors.mapControls.removeMapEraLayers(lMap);

      if (mapImageUrl && layerBounds && era !== 'present') {
        let topLeftLatLng = layerBounds.topLeft.split(',');
        let bottomRightLatLng = layerBounds.bottomRight.split(',');

        L.imageOverlay(mapImageUrl, [topLeftLatLng, bottomRightLatLng], {className: 'era'}).addTo(lMap);
      }
    },

    removeMapEraLayers: function(lMap) {
      let eraLayers = Object.entries(lMap._layers).filter(([key, layer]) => layer.options.className == 'era');
        
      if (eraLayers.length > 0) {
        eraLayers.forEach(layer => layer[1].remove());
      }
    }
  };
  // eslint-disable-next-line no-undef
})(jQuery, Drupal, drupalSettings);

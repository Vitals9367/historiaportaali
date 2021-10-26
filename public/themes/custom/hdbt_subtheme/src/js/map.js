// eslint-disable-next-line no-unused-vars
(($, Drupal, drupalSettings) => {
  let map;

  Drupal.behaviors.map = {
    attach: function(context, settings) {
      let self = this;

      $(document).on('leaflet.map', function(e, settings, lMap, mapid) {
        if (mapid == 'leaflet-map-view-combined-map-block') {
          map = lMap;
          const nidFromUrl = self.getUrlParameter('nid');

          if (nidFromUrl) {
            self.openPopupByNid(nidFromUrl);
          }
        }
      });
    },

    openPopupByNid: function(nid) {
      map.eachLayer(layer => {
        if (layer.options?.entity_id == nid) {
          // Center map to the selected marker and open popup
          map.setView(layer._latlng, 15);
          layer.openPopup();
        }
      });
    },

    getUrlParameter: function(sParam) {
      var sPageURL = window.location.search.substring(1),
          sURLVariables = sPageURL.split('&'),
          sParameterName,
          i;
    
      for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) {
          return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
      }
      return false;
    }
  };
  // eslint-disable-next-line no-undef
})(jQuery, Drupal, drupalSettings);
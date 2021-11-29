// eslint-disable-next-line no-unused-vars
(($, Drupal, drupalSettings) => {
  let map;

  Drupal.behaviors.map = {
    attach: function(context, settings) {
      let self = this;

      $(document).on('leaflet.map', function(e, settings, lMap, mapid) {
        if (mapid == 'leaflet-map-view-combined-map-page') {
          map = lMap;
          const idFromUrl = self.getUrlParameter('id');

          if (idFromUrl) {
            self.openPopupByNid(idFromUrl);
          }
        }
      });

      self.bindFilterToggle(context);
    },

    bindFilterToggle: function(context) {
      $filterToggleBtn = $('.exposed-filters .toggle-filters-btn button', context).once();
      $filterContainer = $('.exposed-filters .exposed-filters__container');

      $filterToggleBtn.on('click', function() {
        $filterContainer.slideToggle(150);
        if ($filterContainer.is(":visible") && $filterToggleBtn.find('span.hds-icon').hasClass('hds-icon--angle-down')) {
          $filterToggleBtn.find('span.hds-icon').removeClass('hds-icon--angle-down');
          $filterToggleBtn.find('span.hds-icon').addClass('hds-icon--angle-up');
        } else {
          $filterToggleBtn.find('span.hds-icon').removeClass('hds-icon--angle-up');
          $filterToggleBtn.find('span.hds-icon').addClass('hds-icon--angle-down');
        }
      });
    },

    openPopupByNid: function(id) {
      map.eachLayer(layer => {
        if (layer.options?.entity_id == id) {
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
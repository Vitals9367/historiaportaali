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

          self.bindPopupPositioning();

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
      let selectedMarker = null;
      let zoomAmount = 15;

      map.eachLayer(layer => {
        if (layer.options?.entity_id == id) {
          selectedMarker = layer;
        }

        // Try to find the layer from marker groups
        if (layer._group && !selectedMarker) {
          const childMarkers = layer.getAllChildMarkers();
          childMarkers.forEach(childMarker => {
            if (childMarker.options?.entity_id == id) {
              selectedMarker = childMarker;

              // Zoom closer if the marker is inside a group to make
              // sure that the marker is visible before opening popup
              zoomAmount = 18;
            }
          });
        }
      });

      if (selectedMarker) {
        // Center map to the selected marker
        console.log(selectedMarker._latlng);
        map.setView(selectedMarker._latlng, zoomAmount);

        // Wait for the centering to finish before opening popup
        map.on('moveend', function() {
          selectedMarker.openPopup();
        });

        map.on('popupopen', function() {
          map.off('moveend');
        });
      }
    },

    bindPopupPositioning: function() {
      map.on('popupopen', function(e) {
        // Find the pixel location on the map where the popup anchor is
        var px = map.project(e.target._popup._latlng);
        // Find the height of the popup container and subtract from the Y axis of marker location
        px.y -= e.target._popup._container.clientHeight;
        // Pan to new center
        map.panTo(map.unproject(px),{animate: true});
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
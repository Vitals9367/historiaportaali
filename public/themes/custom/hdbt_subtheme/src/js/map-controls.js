// eslint-disable-next-line no-unused-vars
(($, Drupal, drupalSettings) => {
  Drupal.behaviors.mapControls = {
    attach: function(context, settings) {
      let self = this;

      $(document).on('leaflet.map', function(e, settings, lMap, mapid) {
        self.bindEraControls(lMap);
        self.bindZoomControls(lMap);
        self.bindLocateControl(lMap);
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
    },

    bindZoomControls: function(lMap) {
      let $zoomInBtn = $('.map-controls__control-button#zoom-in-btn');
      let $zoomOutBtn = $('.map-controls__control-button#zoom-out-btn');

      $zoomInBtn.on('click', function() {
        lMap.zoomIn();
      });

      $zoomOutBtn.on('click', function() {
        lMap.zoomOut();
      });
    },

    bindLocateControl: function(lMap) {
      let self = this;
      let $locateBtn = $('.map-controls__control-button#locate-btn');

      $locateBtn.on('click', function() {
        if (!navigator.geolocation) {
          console.log('Geolocation is not supported by your browser');
        } else {
          self.showLoadingSpinner();
          
          navigator.geolocation.getCurrentPosition((position) => {
            self.hideLoadingSpinner();

            const userLat = position.coords.latitude;
            const userLon = position.coords.longitude;
            
            self.addUserLocationMarker(userLat, userLon, lMap);
            
            lMap.panTo([userLat, userLon]);
            lMap.setZoom(15);
          }, (error) => {
            if (error.code === 1) {
              self.showGeolocationDeniedBox();
            }
            self.hideLoadingSpinner();
          });
        }
      });
    },

    addUserLocationMarker: function(userLat, userLon, lMap) {
      let userLatLng = new L.LatLng(userLat, userLon);

      let userIcon = L.icon({
        iconSize: ['36', '36'],
        iconUrl: '/themes/custom/hdbt_subtheme/src/icons/user.svg'
      });

      let userMarker = L.marker(userLatLng, {
        icon: userIcon
      });
      
      userMarker.addTo(lMap);
    },

    showGeolocationDeniedBox: function() {
      let title = Drupal.t('Location data blocked', {}, {context: 'Map selectors'});
      let description = Drupal.t('Unfortunately, we are unable to show places on the map based on your location until you agree to use your location.', {}, {context: 'Map selectors'});
      let closeBtnText = Drupal.t('Close', {}, {context: 'Map selectors'});

      $('.leaflet-container').prepend(`
        <div id="geolocation-denied-overlay" style="display:none;">
          <div class="info-box">
            <div class="info-header">
              <span class="info-icon"></span>
              <h3>${title}</h3>
              <div class="close-btn" role="button">${closeBtnText}</div>
            </div>
            <p>${description}</p>
          </div>
        </div>
      `);

      $('#geolocation-denied-overlay').fadeIn(150);

      $('#geolocation-denied-overlay .close-btn').on('click', function() {
        $('#geolocation-denied-overlay').fadeOut(150);
      });
    }
  };
  // eslint-disable-next-line no-undef
})(jQuery, Drupal, drupalSettings);

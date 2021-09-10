// eslint-disable-next-line no-unused-vars
(($, Drupal, drupalSettings) => {
  Drupal.behaviors.searchView = {
    attach: function attach() {
      if ($('.search-filters .block-facet--dropdown').length > 0) {
        $('.search-filters .block-facet--dropdown select.facets-dropdown').addClass('hds-text-input__input');
      }
    },
  };
  // eslint-disable-next-line no-undef
})(jQuery, Drupal, drupalSettings);

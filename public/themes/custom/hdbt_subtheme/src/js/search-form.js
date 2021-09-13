// eslint-disable-next-line no-unused-vars
(($, Drupal, drupalSettings) => {
  Drupal.behaviors.searchForm = {
    attach: function attach() {
      $('.search__exposed-filters .year-interval__toggle').on('click', function() {
        $('.search__exposed-filters .year-interval__form-items').toggleClass('hidden');
      });
    },
  };
  // eslint-disable-next-line no-undef
})(jQuery, Drupal, drupalSettings);

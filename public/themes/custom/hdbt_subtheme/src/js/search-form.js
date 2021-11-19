// eslint-disable-next-line no-unused-vars
(($, Drupal, drupalSettings) => {
  Drupal.behaviors.searchForm = {
    attach: function attach(context) {
      $('.search__exposed-filters .year-interval__toggle', context).on('click', function() {
        $('.search__exposed-filters .year-interval__form').toggleClass('hidden');
      });
    },
  };
  // eslint-disable-next-line no-undef
})(jQuery, Drupal, drupalSettings);

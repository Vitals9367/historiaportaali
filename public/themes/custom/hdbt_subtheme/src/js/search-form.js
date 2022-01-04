// eslint-disable-next-line no-unused-vars
(($, Drupal, drupalSettings) => {
  Drupal.behaviors.searchForm = {
    attach: function attach(context) {
      $('.exposed-filters .year-interval__toggle', context).on('click', function(e) {
        const pressed = e.target.getAttribute('aria-pressed') === 'true';
        e.target.setAttribute('aria-pressed', String(!pressed));

        $('.exposed-filters .year-interval__form').toggleClass('hidden');
      });
    },
  };
  // eslint-disable-next-line no-undef
})(jQuery, Drupal, drupalSettings);

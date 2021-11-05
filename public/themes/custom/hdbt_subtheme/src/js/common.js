// eslint-disable-next-line no-unused-vars
(($, Drupal, drupalSettings) => {
  Drupal.behaviors.themeCommon = {
    attach: function (context, settings) {

      // Show 'Back'-link if the user
      // is coming from another page
      let previousUrl = document.referrer;
      if (previousUrl) {
        // Default to the generic back link
        let $backLinkEl = $('.generic-back-link', context);

        // Use 'Back to search results'-link if the user
        // is coming from the search page
        if (previousUrl.includes('/haku') ||
            previousUrl.includes('/search')) {
          $backLinkEl = $('.back-to-search-results', context);
        }
        
        const $container = $backLinkEl.closest('.container');

        if ($backLinkEl.length) {
          $('a', $backLinkEl).attr('href', previousUrl);

          if (!$container.is(':visible')) {
            $container.show();
          }

          $backLinkEl.show();
        }
      }
    },
  };
  // eslint-disable-next-line no-undef
})(jQuery, Drupal, drupalSettings);

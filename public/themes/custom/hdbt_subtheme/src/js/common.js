// eslint-disable-next-line no-unused-vars
(($, Drupal, drupalSettings) => {
  Drupal.behaviors.themeCommon = {
    attach: function (context, settings) {

      // Show 'Back to search results'-button if the user
      // is coming from the search page
      let previousUrl = document.referrer;
      if (previousUrl && 
        (previousUrl.includes('/haku') ||
        previousUrl.includes('/search'))
      ) {
        const $backToSearchResultsEl = $('#back-to-search-results', context);
        const $container = $backToSearchResultsEl.closest('.container');

        if ($backToSearchResultsEl.length) {
          $('a', $backToSearchResultsEl).attr('href', previousUrl);

          if (!$container.is(':visible')) {
            $container.show();
          }

          $backToSearchResultsEl.show();
        }
      }
    },
  };
  // eslint-disable-next-line no-undef
})(jQuery, Drupal, drupalSettings);

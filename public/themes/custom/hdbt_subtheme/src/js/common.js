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
        $linkContainer = $('#back-to-search-results', context);

        if ($linkContainer.length) {
          $('a', $linkContainer).attr('href', previousUrl);
          $linkContainer.show();
        }
      }
    },
  };
  // eslint-disable-next-line no-undef
})(jQuery, Drupal, drupalSettings);

// eslint-disable-next-line no-unused-vars
(($, Drupal, drupalSettings) => {
  Drupal.behaviors.finnaImport = {
    attach: function attach() {

      // Create input button
      $('#edit-field-finna-id-wrapper').after('<input id="finna" class="button" value="Finna.fi import"></input>');
      $('#finna').button().click(function(){

        $finna_id = $('#edit-field-finna-id-0-value').val();

        // Main loop begins
        $.getJSON('https://api.finna.fi/api/v1/record?id=' + $finna_id + '&prettyPrint=false&lng=fi', function(data) {

          // Field: Formats
          var formats_data = data['records'][0]['formats'];

          $(formats_data).each((index, element) => {
            var format_data = {
              id: '$ID:' + element['translated'],
              text: element['translated']
            };
            // This URL should probably be resolved with regxp from #edit-field-formats...
            $.getJSON('/select2_autocomplete/taxonomy_term/default:taxonomy_term/63DcPSsYfssc_2rLO90Cmlk-c4DwPmfe_Aj4iFdxcpM?term=' + format_data.text + '&_type=query&q=' + format_data.text, function(data) {
              if (data['results'].length > 0 && data['results'][0]['text'] === format_data.text) {
                // Match found, use existing term ID for option
                format_data.id = data['results'][0]['id'];
              }
              // Append option and select it
              var option = new Option(format_data.text, format_data.id, true, true);
              $('#edit-field-formats').append(option).trigger('change');
            });
          });

          // Field: Authors
          var authors_data = data['records'][0]['nonPresenterAuthors'];

          $(authors_data).each((index, element) => {
            var author_data = {
              id: '$ID:' + element['name'],
              text: element['name']
            };
            // This URL should probably be resolved with regxp from #edit-field-authors...
            $.getJSON('/select2_autocomplete/taxonomy_term/default:taxonomy_term/nL39PHzAu3uXzCPe2BBSlw4VVVuZsLVS6RtbkaMLdS8?term=' + author_data.text + '&_type=query&q=' + author_data.text, function(data) {
              if (data['results'].length > 0 && data['results'][0]['text'] === author_data.text) {
                // Match found, use existing term ID for option
                author_data.id = data['results'][0]['id'];
              }
              // Append option and select it
              var option = new Option(author_data.text, author_data.id, true, true);
              $('#edit-field-authors').append(option).trigger('change');
            });
          });

          // Field: Copyrights
          var copyrights_data = data['records'][0]['imageRights'];

          $(copyrights_data).each((index, element) => {
            var copyright_data = {
              id: '$ID:' + element['copyright'],
              text: element['copyright']
            };
            // This URL should probably be resolved with regxp from #edit-field-copyrights...
            $.getJSON('/select2_autocomplete/taxonomy_term/default:taxonomy_term/HSgHktR7ejpMhZd1Y-atx9Axw7SuNtwq0FT_sAh8smU?term=' + copyright_data.text + '&_type=query&q=' + copyright_data.text, function(data) {
              if (data['results'][0]['text'] === copyright_data.text) {
                // Match found, use existing term ID
                copyright_data.id = data['results'][0]['id'];
              }
              // Append option and select it
              var option = new Option(copyright_data.text, copyright_data.id, true, true);
              $('#edit-field-copyrights').append(option).trigger('change');
            });
          });

          // Field: Building
          var buildings_data = data['records'][0]['buildings'];

          $(buildings_data).each((index, element) => {
            var building_data = {
              id: '$ID:' + element['translated'],
              text: element['translated']
            };
            // This URL should probably be resolved with regxp from #edit-field-buildings...
            $.getJSON('/select2_autocomplete/taxonomy_term/default:taxonomy_term/8S0fSi9mz_jgq_PU9xvyDN2ir3lHAnsjmz7_9rnCThY?term=' + building_data.text + '&_type=query&q=' + building_data.text, function(data) {
              if (data['results'][0]['text'] === building_data.text) {
                // Match found, use existing term ID
                building_data.id = data['results'][0]['id'];
              }
              // Append option and select it
              var option = new Option(building_data.text, building_data.id, true, true);
              $('#edit-field-buildings').append(option).trigger('change');
            });
          });

        // Main loop ends
        });
      });    
    },
  };
  // eslint-disable-next-line no-undef
})(jQuery, Drupal, drupalSettings);

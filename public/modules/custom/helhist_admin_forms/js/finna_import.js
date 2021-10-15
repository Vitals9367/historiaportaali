// eslint-disable-next-line no-unused-vars
(($, Drupal, drupalSettings) => {
  Drupal.behaviors.finnaImport = {
    attach: function attach() {
      $('#edit-field-finna-id-wrapper').after('<input id="finna" class="button" value="Finna.fi import"></input>');

      $('#finna').button().click(function(){

        $finna_id = $('#edit-field-finna-id-0-value').val();

        $.getJSON('https://api.finna.fi/api/v1/record?id=' + $finna_id + '&prettyPrint=false&lng=fi', function(data) {

        // FORMATS
        var format_data = {
          id: '$ID:' + data['records'][0]['formats'][0]['translated'],
          text: data['records'][0]['formats'][0]['translated']
        };

        var format_option = new Option(format_data.text, format_data.id, true, true);
        $('#edit-field-formats').append(format_option).trigger('change');

        // AUTHORS
        var author_data = {
          id: '$ID:' + data['records'][0]['nonPresenterAuthors'][0]['name'],
          text: data['records'][0]['nonPresenterAuthors'][0]['name']
        };

        var author_option = new Option(author_data.text, author_data.id, true, true);
        $('#edit-field-authors').append(author_option).trigger('change');

        // COPYRIGHTS
        var copyright_data = {
          id: '$ID:' + data['records'][0]['imageRights']['copyright'],
          text: data['records'][0]['imageRights']['copyright']
        };

        var copyright_option = new Option(copyright_data.text, copyright_data.id, true, true);
        $('#edit-field-copyrights').append(copyright_option).trigger('change');

        // BUILDINGS
        var building_data = data['records'][0]['buildings'];

        $(building_data).each((index, element) => {
          var building = {
            id: '$ID:' + element['translated'],
            text: element['translated']
          };

          var building_option = new Option(building.text, building.id, true, true);
          $('#edit-field-buildings').append(building_option).trigger('change');
        });

        $('.select2-container').width('100%');
      });
     });    
    },
  };
  // eslint-disable-next-line no-undef
})(jQuery, Drupal, drupalSettings);

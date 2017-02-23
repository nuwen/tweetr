const MAX_CHARS = 140;

$(document).ready(function() {
  $('.new-tweet').on('input', 'textarea', function() {

    var userInput = $(this).val().trim().length;
    var counter = $(this).closest('.new-tweet').find('.counter');

    counter.text(MAX_CHARS - userInput);

    if (userInput > MAX_CHARS) {
      counter.addClass('overlimit');
    } else {
      counter.removeClass('overlimit');
    }

  });
});

const MAX_CHARS = 140;

$(document).ready(function() {
  $('.new-tweet').on('input', 'textarea', function() {
//currently miscounts by 1
    var userInput = $(this).val().length;
    var counter = $(this).closest('.new-tweet').find('.counter');

    counter.text(MAX_CHARS - userInput);

    if(userInput > MAX_CHARS) {
      counter.addClass('overlimit');
    } else {
      counter.removeClass('overlimit');
    }

  });
});

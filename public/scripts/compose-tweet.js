$(function() {

  $('.compose').on('click', function() {
    $('.new-tweet').slideToggle(500);
    $('textarea').focus();

  });
});

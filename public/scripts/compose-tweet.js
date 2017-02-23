$(function() {

  $('.compose').on('click', function() {
    $('.new-tweet').slideToggle(500);
    $('textarea').focus();
  });
});



// $(document).ready( function() {
//
//   $('.compose').on('click', function() {
//
//     $('n').toggleClass('visible');
//   });
//
//   $('.tweet-feed').on('mouseleave', function() {
//     var icons = $(this).find('.fa');
//     icons.toggleClass('visible');
//   });
// });

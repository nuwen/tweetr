$(document).ready( function() {

  $('.tweet-feed').on('mouseenter', function() {
    var icons = $(this).find('.fa');
    icons.toggleClass('visible');
  });

  $('.tweet-feed').on('mouseleave', function() {
    var icons = $(this).find('.fa');
    icons.toggleClass('visible');
  });
});

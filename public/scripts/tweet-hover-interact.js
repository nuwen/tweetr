$(document).ready(function() {

  $(document).on('mouseenter', '.tweet-feed', function() {
    var icons = $(this).find('.fa');
    icons.toggleClass('visible');
  });

  $(document).on('mouseleave', '.tweet-feed', function() {
    var icons = $(this).find('.fa');
    icons.toggleClass('visible');
  });

  console.log($('.tweet-feed'));
});

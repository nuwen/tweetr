const NOTHING = 1;
const WHITESPACE = 2;
const TOOMANY = 3;
const SERVER = 4;

function createTweetElement(data) {
  const $avatar = $('<img>', {
    'class': 'avatar',
    src: data.user.avatars.small
  });
  const $username = $('<span></span>', {
    'class': 'username',
    text: data.user.name
  });
  const $handle = $('<span></span>', {
    'class': 'user-handle',
    text: data.user.handle
  });
  const $header = $('<header></header>').append($avatar, $username, $handle);

  const $content = $('<p></p>', {
    'class': 'tweet',
    text: data.content.text
  });

  let localdate = new Date(data.created_at)
  const $age = $('<span></span>', {
    'class': 'tweet-age',
    text: localdate
  });
  const $icons = $('<span></span>', {
    'class': 'icons',
    html: '<i class="fa fa-flag ico" aria-hidden="true"></i><i class="fa fa-retweet ico" aria-hidden="true"></i><i class="fa fa-heart ico" aria-hidden="true"></i>'
  });
  const $footer = $('<footer></footer').append($age, $icons);

  const $article = $('<article></article>', {
    'class': 'tweet-feed'
  }).append($header, $content, $footer);


  return $article;

}

function renderTweets(tweets) {
  tweets.forEach(function(element) {
    let $newTweet = createTweetElement(element);

    $('#tweets').prepend($newTweet);

  });
}


$(function() {

  function loadTweets() {
    console.log('tweets load');


    console.log('button clicked');
    $.ajax({
      method: 'GET',
      url: 'http://localhost:8080/tweets/'
    }).then(function(data) {
      renderTweets(data);
    }).fail(function(xhr, err) {
      console.log(err);
      alert('failed to load');
    });
  }

  function errorMessage(code) {

    $('#error-notifcation').fadeIn({
      queue: false
    }).animate({
      top: '150px'
    });

    $('.error' + code).css('display', 'inline');



    $('#error-notifcation').click(function() {
      $(this).fadeOut({
        queue: false
      }).animate({
        top: '150px'
      });
      $('.error' + code).css('display', 'none');
    });

  }

  loadTweets();

  $('#tweet-submit').on('click', function(event) {
    event.preventDefault();

    // TODO use flash messages

    const $form = $(this).closest('form');
    const $content = $form.find('textarea');
    const contentLength = $content.val().length;
    if (/^\s+$/.test($content.val())) {
      errorMessage(WHITESPACE);
      return;
    }

    if ((contentLength <= 140) && (contentLength >= 1)) {
      $.ajax({
        method: 'POST',
        url: 'http://localhost:8080/tweets/',
        data: $form.serialize()
      }).then(function(data) {

        loadTweets();
        $content.val('');
        $('.counter').text('140');

      }).fail(function(xhr, err) {
        console.log(err);
        errorMessage(SERVER);
      });
    } else if (contentLength <= 0) {
      errorMessage(NOTHING);
    } else {
      errorMessage(TOOMANY);
    }
  });





});

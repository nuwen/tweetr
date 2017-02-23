/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
// var tweetData = [{
//     "user": {
//       "name": "Newton",
//       "avatars": {
//         "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//         "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//       },
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": {
//         "small": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
//         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
//         "large": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
//       },
//       "handle": "@rd"
//     },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   },
//   {
//     "user": {
//       "name": "Johann von Goethe",
//       "avatars": {
//         "small": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
//         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
//         "large": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
//       },
//       "handle": "@johann49"
//     },
//     "content": {
//       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
//     },
//     "created_at": 1461113796368
//   }
// ];


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
    html: '<i class="fa fa-flag" aria-hidden="true"></i><i class="fa fa-retweet" aria-hidden="true"></i><i class="fa fa-heart" aria-hidden="true"></i>'
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

  $('#tweet-submit').on('click', function(event) {
    event.preventDefault();

    // TODO use flash messages

    const $form = $(this).closest('form');
    const $content = $form.find('textarea');
    const contentLength = $content.val().length;

    if ((contentLength <= 140) && (contentLength >= 1)) {
      $.ajax({
        method: 'POST',
        url: 'http://localhost:8080/tweets/',
        data: $form.serialize()
      }).then(function(data) {

        loadTweets();

      }).fail(function(xhr, err) {
        console.log(err);
        alert('failed to like');
      });
    } else {
      alert('ERROR: CHANGE TO FLASH MESSAGE');
    }
  });





});

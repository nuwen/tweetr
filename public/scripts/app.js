/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
var tweetData = {
  "user": {
    "name": "Newton",
    "avatars": {
      "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
};

console.log(typeof tweetData);

function createTweetElement(data) {
  let $avatar = $('<img>', {
    'class': 'avatar',
    src: data.user.avatars.small
  });
  let $username = $('<span></span>', {
    'class': 'username',
    text: data.user.name
  });
  let $handle = $('<span></span>', {
    'class': 'user-handle',
    text: data.user.handle
  });
  let $header = $('<header></header>').append($avatar, $username, $handle);

  let $content = $('<p></p>', {
    'class': 'tweet',
    text: data.content.text
  });

  let $age = $('<span></span>', {
    'class': 'tweet-age',
    text: data.created_at
  });
  let $icons = $('<span></span>', {
    'class': 'icons',
    html: '<i class="fa fa-flag" aria-hidden="true"></i><i class="fa fa-retweet" aria-hidden="true"></i><i class="fa fa-heart" aria-hidden="true"></i>'
  });
  let $footer = $('<footer></footer').append($age, $icons);

  let $article = $('<article></article>', {
    'class': 'tweet-feed'
  }).append($header, $content, $footer);


  // let $article = $('<article></article>',
  // let username = data.user.name;
  // let userHandle = data.user.handle;
  // let tweet = data.content;
  // let tweetAge = data.created_at;




  return $article;

}


var $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like

 // to add it to the page so we can make sure it's got all the right elements, classes, etc.

$(document).ready( function () {

  $('#tweets').append($tweet);

});


// user-pic - scriptsrc
// username
// user-handle

// tweet

// tweet-age

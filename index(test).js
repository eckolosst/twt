'use strict'

var Twitter = require('twitter');
var http = require('http');
var querystring = require('querystring');

var clientTwt = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
});

clientTwt.get('search/tweets', {q: '#yoaliento'}, function (error, tweets, response) {
  var statuses = tweets.statuses;
  var tuits = [];
  for (let i = 0; i < statuses.length ; i++) {
    let user = statuses[i].user;
    tuits.push({
      "name": user.name,
      "screen_name": user.screen_name,
      "profile_image_url_https": user.profile_image_url_https,
      "created_at": statuses[i].created_at,
      "text": statuses[i].text,
      "id_str": statuses[i].id_str,
      "RT": ((statuses[i].text.split(" ",1) === 'RT'))
    });
  }
  console.log(tuits);
  // console.log(response);
});


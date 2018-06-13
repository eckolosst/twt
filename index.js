'use strict'

var Twitter = require('twitter');
var http = require('http');
var querystring = require('querystring');
// var https = require('https');

var options = {
  hostname: '',
  port: ,
  path: '/tweet',
  method: 'POST',
  headers: {}
};

var clientTwt = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
});

clientTwt.get('search/tweets', {q: '#yoaliento'}, function (error, tweets, response) {
  var post_req = null;
  var statuses = tweets.statuses;
  for (let i = 0; i < statuses.length ; i++) {
    let user = statuses[i].user;
    var post_data = querystring.stringify({
      "name": user.name,
      "screen_name": user.screen_name,
      "profile_image_url_https": user.profile_image_url_https,
      "created_at": statuses[i].created_at,
      "text": statuses[i].text,
      "id_str": statuses[i].id_str,
      "RT": ((statuses[i].text.split(" ",1) === 'RT'))
    });
    options.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(post_data)
    };
    post_req = http.request(options, function (res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        // console.log('Response: ' + chunk)
      });
    });
    post_req.write(post_data);
    post_req.end();
  }
});


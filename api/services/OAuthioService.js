var OAuth = require('oauthio');
util = require('util')

OAuth.initialize(sails.config.oauthio.public, sails.config.oauthio.private);

module.exports = {
  getMeetupData: function (info) {
    var user;
    return user = {
      name: info.name,
      image: info.raw.photo.thumb_link,
      link: info.raw.link,
      id: info.raw.id
    };
  },

  getGithubData: function (info) {
    var user;
    return user = {
      name: info.alias,
      image: info.avatar,
      link: info.raw.html_url,
      id: 0 //check out the info for the correct id
    };
  },
  stateToken: function (session) {
    var token = OAuth.generateStateToken(session);
    return token
  },
  auth: function (code, provider, session, callback) {
    OAuth.auth(provider, session, {
      code: code
    }).then(function (request_object) {
       return request_object.me()
    }).then(function (info) {
      var user;
      if (provider === "github") {
        user = OAuthioService.getGithubData(info);
      }
      if (provider === "meetup") {
        user = OAuthioService.getMeetupData(info);
      }
      callback(null, user)
    }).fail(function (error) {
      callback(error, null)
    });
  }
};

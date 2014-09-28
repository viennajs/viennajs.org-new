/**
 * OAuthController
 *
 * @description :: Server-side logic for managing Oauths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var util = require('util')

module.exports = {

  /**
   * `OAuthController.login()`
   */
  login: function (req, res) {
    OAuthioService.auth(req.body.code, req.query.provider, req.session, function (error, user) {
      if (error) {
        sails.log.error(error);
        return res.send(400, "An error occured");
      }
      User.findOrCreate({ externId : user.externId }, user, function (error, user) {
        if (error) {
          sails.log.error(error);
          return res.send(400, "An error occured");
        }
        req.session.user = user;
        return res.json(user);
      })
    })
  },


  /**
   * `OAuthController.logout()`
   */
  logout: function (req, res) {
    if (req.session) {
      req.session.destroy(function (error) {
        if (error) res.serverError()
        return res.redirect("/");
      });
    } else {
      res.redirect("/");
    }
  },


  /**
   * `OAuthController.stateToken()`
   */
  stateToken: function (req, res) {
    var token = OAuthioService.stateToken(req.session)
    res.json({
      token: token
    });
  }
};

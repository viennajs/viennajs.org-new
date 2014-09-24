/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * Only applies to HTTP requests (not WebSockets)
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.http.html
 */

var crypto = require("crypto");
var pathToRegexp = require("path-to-regexp");
var Hashids = require('hashids');

var getMd5 = function (string) {
  string = string || "";
  string = string.trim().toLowerCase();
  var md5Sum = crypto.createHash("md5");
  md5Sum.update(string);
  return md5Sum.digest("hex");
};

var getGravatar = function (email) {
  return "https://secure.gravatar.com/avatar/" + (getMd5(email)) + "?";
};

var isActive = function (request) {
  var active = function (urlPath) {
    var keys, matches, paths, regex, routePath;
    if (!urlPath) {
      return false;
    }
    keys = [];
    paths = [];
    if (request.baseUrl) {
      paths.push(request.baseUrl);
    }
    if (request.route.path !== '/') {
      paths.push(request.route.path);
    }
    routePath = paths.join("");
    regex = pathToRegexp(routePath, keys, {
      sensitive: false,
      strict: false
    });
    matches = urlPath.match(regex);
    sails.log.silly("match?", null !== matches, regex, keys, urlPath, routePath);
    return null !== matches;
  };
  return active;
};

module.exports.http = {

  /****************************************************************************
   *                                                                           *
   * Express middleware to use for every Sails request. To add custom          *
   * middleware to the mix, add a function to the middleware config object and *
   * add its key to the "order" array. The $custom key is reserved for         *
   * backwards-compatibility with Sails v0.9.x apps that use the               *
   * `customMiddleware` config option.                                         *
   *                                                                           *
   ****************************************************************************/

  middleware: {

    customLocals: function (req, res, next) {
      var locals = res.locals;

      if (sails.config.environment === 'development') {
        locals.pretty = true
      }

      locals.basedir = sails.config.paths.views;
      locals.isActive = isActive(req);
      locals.md5 = getMd5;
      locals.gravatar = getGravatar;

      locals.moment = require('moment');
      locals.slug = require('slug');
      locals.shortId = require('shortid');
      locals.uuid = require('node-uuid');

      var hashids = new Hashids(sails.config.hashSalt);
      locals.hashids = hashids;

      return next();
    },
    /***************************************************************************
     *                                                                          *
     * The order in which middleware should be run for HTTP request. (the Sails *
     * router is invoked by the "router" middleware below.)                     *
     *                                                                          *
     ***************************************************************************/
    order: [
      'customLocals',
      'startRequestTimer',
      'cookieParser',
      'session',
      //   'myRequestLogger',
      'bodyParser',
      'handleBodyParserError',
      //'compress',
      'methodOverride',
      'poweredBy',
      //'$custom',
      'router',
      'www',
      'favicon',
      '404',
      '500'
    ]
    /****************************************************************************
     *                                                                           *
     * Example custom middleware; logs each request to the console.              *
     *                                                                           *
     ****************************************************************************/

    // myRequestLogger: function (req, res, next) {
    //     console.log("Requested :: ", req.method, req.url);
    //     return next();
    // }


    /***************************************************************************
     *                                                                          *
     * The body parser that will handle incoming multipart HTTP requests. By    *
     * default as of v0.10, Sails uses                                          *
     * [skipper](http://github.com/balderdashy/skipper). See                    *
     * http://www.senchalabs.org/connect/multipart.html for other options.      *
     *                                                                          *
     ***************************************************************************/

    // bodyParser: require('skipper')

  }

  /***************************************************************************
   *                                                                          *
   * The number of seconds to cache flat files on disk being served by        *
   * Express static middleware (by default, these files are in `.tmp/public`) *
   *                                                                          *
   * The HTTP static cache is only active in a 'production' environment,      *
   * since that's the only time Express will cache flat-files.                *
   *                                                                          *
   ***************************************************************************/

  // cache: 31557600000
};

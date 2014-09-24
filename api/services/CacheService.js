var redis = require('redis');
var HelperService = require('./HelperService');
var err = HelperService.handleErr;

client = redis.createClient();

// used as key prefix in redis. Default: cache:
var cachePrefix = sails.config.cache.prefix || "cache:";

// In seconds. Default: 60 seconds
var cacheTtl = sails.config.cache.ttl || 60;


var getCacheKey = function (key) {
  "use strict";
  return cachePrefix + key;
};

module.exports.get = function (key, callback) {
  "use strict";
  client.get(getCacheKey(key), function (error, response) {
    if (error) return callback(err("Error getting key: '" + key + "'", error), null);
    var value;
    try {
      value = JSON.parse(response);
    }
    catch (error) {
      return callback(err("Error when 'JSON.parse'ing cache value from redis for key '" + key + "'", error), null);
    }
    if (_.isEmpty(value)) {
      sails.log.info("Cache Miss for key '" + key + "'");
      value = null;
    }
    else {
      sails.log.info("Cache Hit for key '" + key + "'");
    }
    return callback(null, value);
  });
};


module.exports.set = function (key, value, callback) {
  "use strict";
  var stringifiedValue;
  try {
    stringifiedValue = JSON.stringify(value);
  }
  catch (error) {
    return callback(err("Value for key '" + key + "'could not be 'JSON.stringify'ied", error), null);
  }
  client.setex(getCacheKey(key), cacheTtl, stringifiedValue, function (error, response) {
    if (error) return callback(err("Error setting cache value for key '" + key + "'", error, null));
    sails.log.info("Set cache value for key '" + key + "'");
    if (_.isFunction(callback)) return callback(null, response);
  });
};

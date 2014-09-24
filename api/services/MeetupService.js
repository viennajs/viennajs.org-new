var MeetupApi = require('meetup-api');
var HelperService = require('./HelperService');
var err = HelperService.handleErr;
var cache = require('./CacheService');

var key = sails.config.meetup.key;
var groupId = sails.config.meetup.groupId;
var meetupClient = MeetupApi(key);


module.exports.getEvents = function (callback) {
  "use strict"
  cache.get('events', function (error, results) {
    if (results)return callback(null, results);
    meetupClient.getEvents({
      group_id: groupId,
      text_format: 'html',
      page: 10,
      offset: 0,
      fields: ['comment_count', 'headcount', 'venue', 'yes_rsvp_count', 'maybe_rsvp_count']
    }, function (error, results) {
      if (error) {
        return callback(err("Error retrieving Meetup Events'", error), null);
      }
      cache.set('events', results);
      return callback(null, results);
    });
  });
};

module.exports.getEvent = function (eventId, callback) {
  "use strict";
  var cacheKey = 'event:' + eventId;
  cache.get(cacheKey, function (error, results) {
    if (results) return callback(null, results);
    meetupClient.getEvents({event_id: eventId}, function (error, results) {
      if (error) {
        return callback(err("Error retrieving Meetup Event '" + eventId + "'", error), null);
      }
      cache.set(cacheKey, results);
      return callback(null, results);
    });
  });
};

module.exports.getRSVPs = function (eventId, callback) {
  "use strict"
  var cacheKey = 'event:' + eventId + ':rsvps';
  cache.get(cacheKey, function (error, results) {
    if (results) return callback(null, results);
    meetupClient.getRSVPs({
      event_id: eventId,
      response: 'yes',
      order: 'name',
      page: 100,
      offset: 0,
      fields: ['member_bio']
    }, function (error, results) {
      if (error) {
        return callback(err("Error retrieving RSVPS for event '" + eventId + "'", error), null);
      }
      cache.set(cacheKey, results);
      return callback(null, results);
    });
  });
};

module.exports.getEventComments = function (eventId, callback) {
  "use strict";
  var cacheKey = 'event:' + eventId + ':comments';
  cache.get(cacheKey, function (error, results) {
    if (results) return callback(null, results);
    meetupClient.getEventComments({event_id: eventId}, function (error, results) {
      if (error) {
        return callback(err("Error getting comments for event '" + eventId + "'", error), null);
      }
      cache.set(cacheKey, results);
      return callback(null, results);
    });
  });
};

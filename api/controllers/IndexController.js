/**
 * TestController
 *
 * @description :: Server-side logic for managing tests
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */


/**
 * `IndexController.index()`
 */
module.exports.get = function (req, res) {
  "use strict";
  MeetupService.getEvents(function (error, events) {
    if (error) throw error;
    return res.view({events: events.results, meta: events.meta});
  });
}


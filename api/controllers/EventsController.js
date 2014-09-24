module.exports.show = function (req, res) {
  "use strict";

  var err = HelperService.handleErr;
  var eventId = req.params.id;

  MeetupService.getEvent(eventId, function (error, event) {
    if (error) throw err("Error retrieving event", error);
    var event = event.results.pop();
    var eventMeta = event.meta;
    eventId = req.params.id;

    MeetupService.getRSVPs(eventId, function (error, rsvps) {
      if (error) throw err("Error retrieving rsvps for event: '" + eventId + "'", error);
      var rsvps = rsvps.results;
      var rsvpsMeta = rsvps.meta;
      var locals = {
        event: event,
        eventMeta: eventMeta,
        rsvps: rsvps,
        rsvpsMeta: rsvpsMeta
      };

      eventId = req.params.id;
      MeetupService.getEventComments(eventId, function (error, comments) {
        if (error) throw err("Error retrieving comments for event '" + eventId + "'", error);
        locals.comments = comments.results;
        res.view(locals);
      });

    });

  });

};

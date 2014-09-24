var util = require('util');

module.exports.inspect = function (error) {
  "use strict";
  return util.inspect(error, {depth: null});
};

module.exports.newErr = function (message, cause) {
  "use strict";
  return new Error(message + " Cause: '" + inspect(cause) + "'");
};

module.exports.handleErr = function (message, error) {
  "use strict";
  sails.log.error(message, error);
  return newErr(message, error);
};

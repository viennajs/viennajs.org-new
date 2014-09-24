/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

var uuid = require('node-uuid');

module.exports = {

  attributes: {

    uuid: {
      type: 'string',
      primaryKey: true,
      unique: true,
      required: true,
      uuidv4: true
    },
    name: {
        type: 'string',
        required: true
    },
    image: {
        type: 'string'
    },
    link: {
        type: 'string'
    },
    id: {
        type: 'integer'
    }
  },


  beforeValidate: function (values, next) {
    if (_.isEmpty(values.uuid)) {
      values.uuid = uuid.v4();
    }
    next();
  }
};


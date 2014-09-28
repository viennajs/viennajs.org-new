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
        type: 'STRING',
        primaryKey: true,
        uuidv4: true,
        defaultsTo: uuid.v4
    },
    name: {
        type: 'string',
        required: true
    },
    email: {
        type: 'email'
    },
    image: {
        type: 'string'
    },
    link: {
        type: 'string'
    },
    externId: {
        type: 'integer'
    }
  }
};


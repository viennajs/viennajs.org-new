/** @jsx React.DOM */

var React = require('react');
var Test = require('./app/components/Test.react.js');

React.initializeTouchEvents(true);

React.renderComponent(
  <Test/>,
  document.getElementById('reactive')
);

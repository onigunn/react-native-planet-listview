/**
 * React List View Example
 * https://github.com/onigunn/react-listview-example
 * 
 * Copyright (c) 2015 Onur Guengoeren
 */
'use strict';

var PlanetListView = require('./listView.js');
var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var ReactListView = React.createClass({
  render: function() {
    return (
      <PlanetListView />
    );
  }
});

AppRegistry.registerComponent('ReactListView', () => ReactListView);

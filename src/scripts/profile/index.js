'use strict';
require('angular-ui-router');
require('famous-angular');
require('ngCordova');
require('angular-material');
require('angularfire');

var modulename = 'profile';

module.exports = function(namespace) {

  var fullname = namespace + '.' + modulename;

  var angular = require('angular');
  var app = angular.module(fullname, ['ui.router', 'famous.angular', 'ngCordova', 'ngMaterial', 'firebase']);
  // inject:folders start
  require('./controllers')(app);
  require('./directives')(app);
  require('./services')(app);
  // inject:folders end

  return app;
};

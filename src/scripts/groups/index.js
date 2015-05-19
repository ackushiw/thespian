'use strict';
require('famous-angular');
require('ngCordova');

var modulename = 'groups';

module.exports = function(namespace) {

  var fullname = namespace + '.' + modulename;

  var angular = require('angular');
  var app = angular.module(fullname, ['famous.angular', 'ngCordova']);
  // inject:folders start
  require('./controllers')(app);
  require('./directives')(app);
  // inject:folders end

  return app;
};

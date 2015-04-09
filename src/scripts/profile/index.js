'use strict';

require('famous-angular');
require('ngCordova');
require('angularfire');

var modulename = 'profile';

module.exports = function(namespace) {

  var fullname = namespace + '.' + modulename;

  var angular = require('angular');
  var app = angular.module(fullname, ['famous.angular', 'ngCordova', 'firebase']);
  // inject:folders start
  require('./controllers')(app);
  require('./services')(app);
  // inject:folders end

  return app;
};
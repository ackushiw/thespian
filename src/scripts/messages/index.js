'use strict';

require('famous-angular');
require('ngCordova');

var modulename = 'messages';

module.exports = function(namespace) {

  var fullname = namespace + '.' + modulename;

  var angular = require('angular');
  var app = angular.module(fullname, ['famous.angular', 'ngCordova']);
  // inject:folders start
  // inject:folders end

  return app;
};

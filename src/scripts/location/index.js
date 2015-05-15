'use strict';
require('angular-ui-router');
require('famous-angular');
require('ngCordova');
require('angularGeoFire');
require('angularfire');


var modulename = 'location';

module.exports = function(namespace) {

    var fullname = namespace + '.' + modulename;

    var angular = require('angular');
    var app = angular.module(fullname, ['ui.router', 'famous.angular', 'ngCordova', 'firebase', 'angularGeoFire']);
    // inject:folders start
    require('./directives')(app);
    //require('./services')(app);
    // inject:folders end


    return app;
};

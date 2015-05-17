'use strict';
require('angular-ui-router');
require('famous-angular');
require('ngCordova');

var modulename = 'api';

module.exports = function(namespace) {

    var fullname = namespace + '.' + modulename;

    var angular = require('angular');
    var app = angular.module(fullname, ['ui.router', 'famous.angular', 'ngCordova']);
    // inject:folders start
    require('./services')(app);
    // inject:folders end

    

    return app;
};

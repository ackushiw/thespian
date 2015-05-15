'use strict';
require('angular-ui-router');

require('famous-angular');
require('ngCordova');

var modulename = 'tags';

module.exports = function(namespace) {

    var fullname = namespace + '.' + modulename;

    var angular = require('angular');
    var app = angular.module(fullname, ['ui.router', 'famous.angular', 'ngCordova']);
    // inject:folders start
    require('./directives')(app);
    // inject:folders end

    

    return app;
};

'use strict';


var modulename = 'users';

module.exports = function(namespace) {

    var fullname = namespace + '.' + modulename;

    var angular = require('angular');
    var app = angular.module(fullname, []);
    // inject:folders start
    require('./controllers')(app);
    // inject:folders end



    return app;
};

'use strict';

var namespace = 'main';

var angular = require('angular');

var app = angular.module(namespace, [
    // inject:modules start
    require('./layout')(namespace).name,
        require('./profile')(namespace).name,
        require('./tags')(namespace).name
    // inject:modules end
]);

var runDeps = [];
var run = function() {
};

run.$inject = runDeps;
app.run(run);

module.exports = app;
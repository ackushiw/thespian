'use strict';

var namespace = 'main';

var angular = require('angular');

var app = angular.module(namespace, [
    // inject:modules start
    require('./api')(namespace).name,
        require('./google')(namespace).name,
        require('./groups')(namespace).name,
        require('./layout')(namespace).name,
        require('./location')(namespace).name,
        require('./messages')(namespace).name,
        require('./profile')(namespace).name,
        require('./projects')(namespace).name,
        require('./tags')(namespace).name,
        require('./users')(namespace).name
    // inject:modules end
]);

var runDeps = [];
var run = function() {
};

run.$inject = runDeps;
app.run(run);

module.exports = app;
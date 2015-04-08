'use strict';
require('angular-ui-router');

require('famous-angular');
require('ngCordova');
require('angular-material');
require('ng-resize');

var modulename = 'layout';

module.exports = function(namespace) {

  var fullname = namespace + '.' + modulename;

  var angular = require('angular');
  var app = angular.module(fullname, ['ui.router', 'famous.angular', 'ngCordova', 'ngMaterial', 'ngResize']);
  // inject:folders start
  require('./controllers')(app);
  require('./directives')(app);
  // inject:folders end

  app.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/');
      $stateProvider.state('app', {
        url: '/',
        template: '<responsive></responsive>', //responsive has the following child ui-views
        //[topnav],
        //[sidenav],
        //[main] -- this is the main view, the mobile first view,
        //[expanded] -- this is the view that gets shown on large tablets and desktops, you can also use it to show child views on mobile,
        //[action] -- this is the action button
        controller: fullname + '.main',
        controllerAs: 'layoutCtrl'
      }).state('app.profile', {
        url: 'app',
        views: {
          'topnav': {
            template: require('./views/default-topnav.html')
          },
          'sidenav': {
            template: require('./views/default-sidenav.html')
          },
          'main': {
            template: require('./views/default-main.html'),
            controller: fullname + '.mainView',
            controllerAs: 'mainViewCtrl'
          },
          'expanded': {
            template: require('./views/default-expanded.html')
          },
          'action': {
            template: require('./views/default-action.html')
          }
        }
      }).state('app.profile.stats', {
        url: '/stats',
        views: {
          'expanded@': {
            template: require('./views/profile/stats.html')
          }
        }
      });
    }
  ]);

  return app;
};
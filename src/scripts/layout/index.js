'use strict';
require('angular-ui-router');

require('famous-angular');
require('ngCordova');
require('angular-material');
require('ng-resize');
require('angularfire');
require('firebase-index');

var modulename = 'layout';

module.exports = function(namespace) {

  var fullname = namespace + '.' + modulename;

  var angular = require('angular');
  var profileModule = require('../profile')(namespace);
  var app = angular.module(fullname, ['ui.router', 'famous.angular', 'ngCordova', 'ngMaterial', 'ngResize', 'firebase', profileModule.name]);
  // inject:folders start
  require('./controllers')(app);
  require('./directives')(app);
  require('./services')(app);
  // inject:folders end

  app.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/app');
      $stateProvider.state('landing', {
        url: '/welcome',
        template: require('./views/home.html'),
        controller: fullname + '.landing',
        controllerAs: 'landingCtrl'
      }).state('app', {
        url: '/',
        abstract: true,
        template: '<responsive></responsive>', //responsive has the following child ui-views
        //[topnav],
        //[sidenav],
        //[main] -- this is the main view, the mobile first view,
        //[expanded] -- this is the view that gets shown on large tablets and desktops, you can also use it to show child views on mobile,
        //[action] -- this is the action button
        controller: fullname + '.main',
        controllerAs: 'layoutCtrl',
        resolve: {
          'currentAuth': [fullname + '.auth', '$state', '$log', function(Auth, $state, $log) {
            return Auth.$requireAuth().then(function(data) {
              $log.log('Security check passed: ', data);
              return data;
            }).catch(function(error) {
              $log.error('Error: ', error);
              $state.go('landing');
            });
          }]
        }
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
          'expanded@app': {
            template: require('./views/profile/stats.html'),
            controller: profileModule.name + '.stats',
            controllerAs: 'statsCtrl',
            onExit: ['$firebaseObject', 'FBURL', 'cuurentAuth', function($firebaseObject, FBURL, currentAuth) {
              console.log('onExit function');
              var ref = new Firebase(FBURL + '/actorsProfiles/' + currentAuth.uid);
              obj = $firebaseObj(ref);
              obj.$priority = obj.actorName;
            }]
          }
        }
      }).state('app.profile.resume', {
        url: '/resume',
        views: {
          'expanded@app': {
            template: require('./views/profile/resume.html'),
            controller: profileModule.name + '.resume',
            controllerAs: 'resumeCtrl'
          }
        }
      }).state('app.profile.pictures', {
        url: '/pictures',
        views: {
          'expanded@app': {
            template: require('./views/profile/pictures.html')
          }
        }
      }).state('app.profile.videos', {
        url: '/reel',
        views: {
          'expanded@app': {
            template: require('./views/profile/reel.html')
          }
        }
      }).state('app.profile.news', {
        url: '/news',
        views: {
          'expanded@app': {
            template: require('./views/profile/news.html')
          }
        }
      }).state('app.profile.groups', {
        url: '/companies',
        views: {
          'expanded@app': {
            template: require('./views/profile/groups.html')
          }
        }
      });
    }
  ]);

  app.constant('FBURL', 'https://thespus.firebaseio.com');

  return app;
};
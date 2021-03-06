'use strict';
//apis
require('angular-google-gapi');
require('aws-sdk');
require('angular-facebook');
//angular
require('angular-ui-router');
require('angular-ui-utils');
require('famous-angular');
require('ngCordova');
require('angular-material');
require('angularGeoFire');
require('ng-lodash');
require('angular-google-maps');
require('ngAutocomplete');
require('ng-resize');
require('ng-file-upload');
require('angularfire');
require('oauth-ng');
require('ngstorage');

var modulename = 'layout';

module.exports = function(namespace) {

  var fullname = namespace + '.' + modulename;

  var angular = require('angular');
  var profileModule = require('../profile')(namespace);
  var apiModule = require('../api')(namespace);
  var app = angular.module(fullname, ['ui.router', 'famous.angular', 'angular-google-gapi', 'oauth', 'facebook', 'ngStorage', 'ngCordova', 'ngMaterial', 'uiGmapgoogle-maps', 'ngAutocomplete', 'ngResize', 'ngLodash', 'firebase', 'ngFileUpload', 'angularGeoFire', profileModule.name, apiModule.name]);
  // inject:folders start
  require('./controllers')(app);
  require('./directives')(app);
  require('./services')(app);
  // inject:folders end

  app.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/welcome');
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
        controllerAs: 'appCtrl',
        resolve: {
          'currentAuth': [fullname + '.auth', '$rootScope', '$mdDialog', '$state', 'FBURL', '$window', '$log', function(Auth, $rootScope, $mdDialog, $state, FBURL, $window, $log) {
            return Auth.$requireAuth().then(function(data) {
              $rootScope.fireAuth = Auth;
              var userPresenceRef = new Firebase(FBURL + '/userDir/' + data.uid + '/online');
              userPresenceRef.set(true);
              return data;
            }).catch(function(error) {
              $log.error('Error: ', error);
              var confirm = $mdDialog.confirm()
                .title('You are not signed in.')
                .content('Would you like to sign in?---resolve')
                .ariaLabel('Login')
                .ok('Sign In')
                .cancel('Cancel')
                .hasBackdrop(true);
              $mdDialog.show(confirm).then(function() {
                Firebase.goOnline();
                Auth.$authWithOAuthPopup('google').then(function(authData) {
                  $log.log('Logged in as:', authData.uid);
                  $state.reload();
                }).catch(function(error) {
                  $log.error('Authentication failed:', error);
                });
              }, function() {
                $log.log('login canceled');
                $state.go('landing');
              });

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
            template: require('./views/default-sidenav.html'),
            controller: fullname + '.sidenav',
            controllerAs: 'sidenavCtrl'
          },
          'main': {
            template: require('./views/default-main.html'),
            controller: fullname + '.mainView',
            controllerAs: 'mainViewCtrl'
          },
          'expanded': {
            template: require('./views/default-expanded.html'),
            controller: fullname + '.expanded',
            controllerAs: 'expandedCtrl'
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
            controllerAs: 'statsCtrl'
          }
        },
        onExit: ['currentAuth', '$log', function(currentAuth, $log) {
          $log.log('onExit function');
          // var ref = new Firebase(FBURL + '/actorsProfiles/' + currentAuth.uid);
          // obj = $firebaseObj(ref);
          // obj.$priority = obj.actorName;
        }]
      }).state('app.profile.resume', {
        url: '/resume',
        views: {
          'expanded@app': {
            template: require('./views/profile/resume.html'),
            controller: profileModule.name + '.resume',
            controllerAs: 'resumeCtrl'
          },
          'action@app': {
            template: '<fa-modifier fa-translate="[0,0,500]">' +
              '<fa-surface>' +
              '<md-button aria-label="action button" ng-click="resumeCtrl.add($event)" class="md-fab md-icon-button center">' +
              '<md-icon md-font-icon="mdi mdi-lg mdi-plus" flex></md-icon>' +
              '</md-button>' +
              '</fa-surface>' +
              '</fa-modifier>',
            controller: profileModule.name + '.resume',
            controllerAs: 'resumeCtrl'
          }
        },
        onEnter: ['currentAuth', '$log', function(currentAuth, $log) {
          $log.log('enter function resume');
        }],
        onExit: ['$log', function($log) {
          $log.log('exit resume');
        }]
      }).state('app.profile.pictures', {
        url: '/pictures',
        views: {
          'expanded@app': {
            template: require('./views/profile/pictures.html'),
            controller: profileModule.name + '.pictures',
            controllerAs: 'picturesCtrl'
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
            template: require('./views/profile/groups.html'),
            controller: 'main.groups.userGroups',
            controllerAs: 'userGroupsCtrl'
          },
          'action@app': {
            template: require('./views/groups/action-button.html')
          }
        }
      }).state('app.profile.groups.detail', {
        url: '/:id',
        views: {
          'expanded@app': {
            template: require('./views/groups/group-page.html'),
            controller: 'main.groups.main',
            controllerAs: 'groupPageCtrl'
          }
        },
        resolve: {
          'groupId': ['$stateParams', '$q', '$log', function($stateParams, $q, $log) {
            return $q(function(resolve, reject) {
              if($stateParams.id) {
                resolve($stateParams.id);
              } else {
                $log.error('Error: no group id');
                reject('No group id');
              }
            });
          }]
        }
      }).state('app.messages', { //user messages view
        url: 'messages',
        views: {
          'topnav': {
            template: require('./views/default-topnav.html')
          },
          'sidenav': {
            template: require('./views/default-sidenav.html'),
            controller: fullname + '.sidenav',
            controllerAs: 'sidenavCtrl'
          },
          'main@app': {
            template: require('./views/messages/inbox.html')
          },
          'expanded@app': {
            template: require('./views/messages/conversation.html')
          },
          'action': {
            template: require('./views/messages/action.html')
          }
        }
      }).state('app.projects', { // user projects view
        url: 'projects',
        views: {
          'topnav': {
            template: require('./views/default-topnav.html')
          },
          'sidenav': {
            template: require('./views/default-sidenav.html'),
            controller: fullname + '.sidenav',
            controllerAs: 'sidenavCtrl'
          },
          'main': {
            template: require('./views/projects/drafts-list.html')
          },
          'expanded': {
            template: require('./views/projects/drafts-details.html')
          },
          'action': {
            template: require('./views/default-action.html')
          }
        }
      }).state('app.drafts', { // user drafts of projects
        url: 'drafts',
        views: {
          'topnav': {
            template: require('./views/default-topnav.html')
          },
          'sidenav': {
            template: require('./views/default-sidenav.html'),
            controller: fullname + '.sidenav',
            controllerAs: 'sidenavCtrl'
          },
          'main@app': {
            template: require('./views/projects/drafts-list.html'),
            controller: 'main.projects.draftsList',
            controllerAs: 'draftListCtrl'
          },
          'expanded@app': {
            template: require('./views/projects/drafts-details.html'),
            controller: 'main.projects.draftsDetail',
            controllerAs: 'detailsCtrl'
          },
          'action': {
            template: require('./views/default-action.html')
          }
        }
      }).state('app.drafts.edit', {
        url: '/:id',
        views: {
          'expanded@app': {
            template: require('./views/projects/drafts-details.html'),
            controller: 'main.projects.draftsDetail',
            controllerAs: 'detailsCtrl'
          }
        }
      });

    }
  ]);
  //Amazon AWS config
  app.run(['$window', '$log', function($window, $log) {
    var AWS = $window.AWS;
    $log.log('google api', $window.gapi);
    AWS.config.update({
      accessKeyId: 'AKIAJIOQZUROHBNWSKTQ',
      secretAccessKey: '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'
    });
    AWS.config.region = 'us-east-1';
    // aws.config.credentials = new aws.CognitoIdentityCredentials({
    //   IdentityPoolId: 'us-east-1:44475292-5246-4fdb-ad6d-b3668187d9f8',
    // });
    $log.log('amazon: ', AWS);

  }]);
  //firebase settings
  app.constant('FBURL', 'https://thespus.firebaseio.com');
  //facebook config
  app.config(['FacebookProvider', function(FacebookProvider) {
    FacebookProvider.init('274540376052370');
  }]);
  //google maps settings
  app.config(['uiGmapGoogleMapApiProvider', function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyA-mjOqwdMYO2dKlPGvCqwGOGm5NvTJ-zE',
      v: '3.19',
      libraries: 'places'
    });
  }]);

  return app;
};

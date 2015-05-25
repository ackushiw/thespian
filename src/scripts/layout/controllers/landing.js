'use strict';
var controllername = 'landing';

module.exports = function(app) {
  /*jshint validthis: true */

  var deps = ['$rootScope', '$mdDialog', '$famous', '$timeline', 'main.api.cognito', 'GAuth', 'main.api.google', 'Facebook', 'AWSService', '$firebaseAuth', 'FBURL', '$state', '$log'];

  function controller($rootScope, $mdDialog, $famous, $timeline, cognito, GAuth, Google, Facebook, AWSService, $firebaseAuth, FBURL, $state, $log) {
    var vm = this;
    //firebaseAuth
    var ref = new Firebase(FBURL);
    $rootScope.fireAuth = $firebaseAuth(ref);
    //famous
    var EventHandler = $famous['famous/core/EventHandler'];
    //var EventMapper = $famous['famous/events/EventMapper'];
    //var Engine = $famous['famous/core/Engine'];
    var ScrollSync = $famous['famous/inputs/ScrollSync'];
    //var Transform = $famous['famous/core/Transform'];
    var Transitionable = $famous['famous/transitions/Transitionable'];
    var Easing = $famous['famous/transitions/Easing'];

    vm.scrollEventHandler = new EventHandler();

    vm.scroller = new ScrollSync();
    $log.log(vm.scroller);

    vm.titlePos = {
      translate: new Transitionable(0),
      align: new Transitionable(0),
      origin: new Transitionable(0),
      size: new Transitionable(0)
    };
    vm.loginPos = {
      translate: new Transitionable(0),
      align: new Transitionable(0),
      origin: new Transitionable(0),
      size: new Transitionable(0)
    };

    vm.titleTimeline = {
      translate: $timeline([
        [0, [0, 0, 5], Easing.outExpo],
        [1, [0, 0, 5]]
      ]),
      align: $timeline([
        [0, [0.5, 0.3], Easing.outExpo],
        [1, [0, 0]]
      ]),
      origin: $timeline([
        [0, [0.5, 0.5], Easing.outExpo],
        [1, [0, 0]]
      ]),
      size: $timeline([
        [0, [300, 200], Easing.outExpo],
        [1, [300, 200]]
      ])
    };
    vm.loginTimeline = {
      translate: $timeline([
        [0, [0, 0, 5], Easing.outExpo],
        [1, [0, 0, 5]]
      ]),
      align: $timeline([
        [0, [0.5, 0.5], Easing.outExpo],
        [1, [0, 0]]
      ]),
      origin: $timeline([
        [0, [0.5, 0.5], Easing.outExpo],
        [1, [0, 0]]
      ]),
      size: $timeline([
        [0, [300, 200], Easing.outExpo],
        [1, [300, 200]]
      ])
    };

    vm.message = 'Hello World';
    var activate = function() {
      function authCallback(cognitoAuth) {

        // cognitoAuth.get(function () {
        //   // Access AWS resources here.
        //   cognito.set(cognitoAuth);
        //   $log.log('cognito available?', cognitoAuth);
        // });
        AWSService.credentials().then(function(authData) {
          $log.log('AWSService-auth', authData);
        });

      }

      function facebookCallback(response) {
        $log.log(response);

        if(response.authResponse) {
          $log.log('You are now logged in.');
          // Add the Facebook access token to the Cognito credentials login map.
          cognito.initFacebook(response.authResponse.accessToken, authCallback);
        } else {
          $log.log('There was a problem logging you in.');
        }
      }

      vm.openSignupWizard = function($event) {
        $log.log('open signup seasame');

        var parentEl = angular.element(document.body);
        $mdDialog.show({
          parent: parentEl,
          targetEvent: $event,
          template: require('../views/dialogs/signup-wizard.html'),

          controller: 'main.users.signup',
          controllerAs: 'signupCtrl'
        });
      };
      vm.scrollEventHandler.on('click', function(event) {
        $log.log('start', event);
      });

      vm.launch = function() {
        Firebase.goOnline();
        $rootScope.fireAuth.$authWithOAuthPopup('google').then(function(authData) {
          //vm.signinCallback(authData)
          $state.go('app.profile');
        }).catch(function(error) {
          $log.error('Authentication failed: ', error);
        });

      };

      vm.cognito = function(authData) {
        $log.log(authData);
        var additionalParams = {
          'callback': vm.signinCallback
        };
        Google.signIn(additionalParams);
      };
      vm.facebook = function() {
        Facebook.login(facebookCallback);
      };
      vm.signinCallback = function(authResult) {
        $log.log('signed in: ', authResult);
        if(authResult.status.signed_in) {
          // Add the Google access token to the Cognito credentials login map.
          cognito.initGoogle(authResult.id_token, authCallback);

          Firebase.goOnline();

          ref.authWithOAuthToken('google', authResult.access_token, function(error, authData) {
            if(error) {
              $log.error('Login Failed!', error);
            } else {
              $log.log('Authenticated successfully with payload:', authData);
              $state.go('app.profile');
            }
          });

        } else {
          // Update the app to reflect a signed out user
          // Possible error values:
          //   "user_signed_out" - User is signed-out
          //   "access_denied" - User denied access to your app
          //   "immediate_failed" - Could not automatically log in the user
          $log.log('Sign-in state: ' + authResult.error);
        }
      };

    };
    activate();
  }

  controller.$inject = deps;
  app.controller(app.name + '.' + controllername, controller);
};

'use strict';
var controllername = 'landing';

module.exports = function(app) {
  /*jshint validthis: true */

  var deps = ['$rootScope', '$famous', '$timeline', '$firebaseAuth', 'FBURL', '$state'];

  function controller($rootScope, $famous, $timeline, $firebaseAuth, FBURL, $state) {
    var vm = this;
    //firebaseAuth
    var ref = new Firebase(FBURL);
    $rootScope.fireAuth = $firebaseAuth(ref);
    //famous
    var EventHandler = $famous['famous/core/EventHandler'];
    var EventMapper = $famous['famous/events/EventMapper'];
    var Engine = $famous['famous/core/Engine'];
    var ScrollSync = $famous['famous/inputs/ScrollSync'];
    var Transform = $famous['famous/core/Transform'];
    var Transitionable = $famous['famous/transitions/Transitionable'];
    var Easing = $famous['famous/transitions/Easing'];

    vm.scrollEventHandler = new EventHandler();

    vm.scroller = new ScrollSync();

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
      vm.scrollEventHandler.on('click', function(event) {
        console.log('start', event);
      });

      vm.launch = function() {
        Firebase.goOnline();
        $rootScope.fireAuth.$authWithOAuthPopup('google').then(function(authData) {
          $state.go('app.profile');
        }).catch(function(error) {
          console.error('Authentication failed: ', error);
        });

      };

    };
    activate();
  }

  controller.$inject = deps;
  app.controller(app.name + '.' + controllername, controller);
};

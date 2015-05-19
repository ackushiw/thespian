'use strict';
var controllername = 'sidenav';

module.exports = function(app) {
  /*jshint validthis: true */

  var deps = ['$famous', 'FBURL', '$firebaseArray', 'currentAuth', '$log'];

  function controller($famous, FBURL, $firebaseArray, currentAuth, $log) {
    var vm = this;
    //famous
    var EventHandler = $famous['famous/core/EventHandler'];
    var Transitionable = $famous['famous/transitions/Transitionable'];
    vm.scrollEventHandler = new EventHandler();
    //firebase
    var draftsRef = new Firebase(FBURL + '/drafts-projects/' + currentAuth.uid);
    var syncDrafts = $firebaseArray(draftsRef);
    syncDrafts.$loaded().then(function(data) {
      vm.draftsLength = data.length;
      data.$watch(function(event) {
        vm.draftsLength = data.length;
      });

    }).catch(function(error) {
      $log.error('Error: ', error);
    });
    vm.message = 'Hello World';
    var activate = function() {
      vm.updateSize = function(height, width) {
        vm.contentSize = new Transitionable([undefined, height]);
        $log.log('action height', height);
        $log.log('action width', width);
        vm.contentSize.set([undefined, height]);

        if(width < 600) {
          vm.contentLayout = 'column';
        } else {
          vm.contentLayout = 'row';
        }

      };

    };
    activate();
  }

  controller.$inject = deps;
  app.controller(app.name + '.' + controllername, controller);
};

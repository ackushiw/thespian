'use strict';
var controllername = 'main';

module.exports = function(app) {
  /*jshint validthis: true */

  var deps = ['$firebaseObject', 'FBURL', '$stateParams', '$log']; //resolve : groupId

  function controller($firebaseObject, FBURL, $stateParams, $log) {
    var vm = this;
    console.log($stateParams.id);
    //firebase
    var ref = new Firebase(FBURL + '/groups/' + $stateParams.id);
    vm.sync = $firebaseObject(ref);
    vm.message = 'Hello Group World';
    vm.id = $stateParams.id;
    var activate = function() {

    };
    activate();
  }

  controller.$inject = deps;
  app.controller(app.name + '.' + controllername, controller);
};
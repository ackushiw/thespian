'use strict';
var controllername = 'userGroups';

module.exports = function(app) {
  /*jshint validthis: true */

  var deps = ['$firebaseArray', 'FBURL', 'currentAuth'];

  function controller($firebaseArray, FBURL, currentAuth) {
    var vm = this;
    //firebase
    var ref = new Firebase(FBURL + '/groups-for-users/' + currentAuth.uid);
    vm.list = $firebaseArray(ref);
    vm.uid = currentAuth.uid;
    vm.message = 'Hello userGroups World';
    var activate = function() {

    };
    activate();
  }

  controller.$inject = deps;
  app.controller(app.name + '.' + controllername, controller);
};
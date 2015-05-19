'use strict';
var controllername = 'create'; //group create

module.exports = function(app) {
  /*jshint validthis: true */

  var deps = ['$scope', '$mdDialog', '$firebaseObject', 'FBURL', 'groupObj', 'userId', '$log'];

  function controller($scope, $mdDialog, $firebaseObject, FBURL, groupObj, userId, $log) {
    var vm = this;
    vm.message = 'Hello Group Create World';
    //firebase
    var groupUrl = groupObj.toString();
    var groupRef = new Firebase(groupUrl);
    var syncObj = $firebaseObject(groupRef);
    var groupId = syncObj.$ref().path.o[1];
    //user groups index
    var indexRef = new Firebase(FBURL + '/groups-for-users/' + userId);
    indexRef.child(groupId).set(true);
    var activate = function() {
      syncObj.$bindTo($scope, 'group').then(function() {
        $log.log('group object bound');
      });

    };
    activate();
  }

  controller.$inject = deps;
  app.controller(app.name + '.' + controllername, controller);
};

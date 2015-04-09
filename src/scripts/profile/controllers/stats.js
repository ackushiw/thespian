'use strict';
var controllername = 'stats';

module.exports = function(app) {
  /*jshint validthis: true */

  var deps = ['$scope', '$firebaseObject', 'FBURL', 'currentAuth'];

  function controller($scope, $firebaseObject, FBURL, currentAuth) {
    var vm = this;
    vm.message = currentAuth.uid;
    //firebase
    var googleRef = new Firebase(FBURL + '/userDir/' + currentAuth.uid);
    var userRef = new Firebase(FBURL + '/actorsProfiles/' + currentAuth.uid);
    var userObj = $firebaseObject(userRef);

    var activate = function() {
      userObj.$bindTo($scope, 'userStats').then(function() {

      });

    };
    activate();
  }

  controller.$inject = deps;
  app.controller(app.name + '.' + controllername, controller);
};
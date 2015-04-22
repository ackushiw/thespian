'use strict';
var controllername = 'create';

module.exports = function(app) {
  /*jshint validthis: true */

  var deps = ['$scope', '$mdDialog', 'draftObj', '$firebaseObject', '$log'];

  function controller($scope, $mdDialog, draftObj, $firebaseObject, $log) {
    var vm = this;
    //firebase
    var draftUrl = draftObj.toString();
    var draftRef = new Firebase(draftUrl);
    var draftObj = $firebaseObject(draftRef);
    vm.message = 'Create Project Hello World';
    var activate = function() {
      draftObj.$bindTo($scope, 'project').then(function() {
        $log.log('object bound');
      });

    };
    activate();
  }

  controller.$inject = deps;
  app.controller(app.name + '.' + controllername, controller);
};
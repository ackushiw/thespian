'use strict';
var controllername = 'draftsDetail';

module.exports = function(app) {
  /*jshint validthis: true */

  var deps = ['$firebaseObject', 'FBURL', '$stateParams', 'currentAuth'];

  function controller($firebaseObject, FBURL, $stateParams, currentAuth) {
    var vm = this;
    var ref = new Firebase(FBURL + '/drafts-projects/' + currentAuth.uid + '/' + $stateParams.id);
    vm.draftObject = $firebaseObject(ref);
    vm.message = vm.draftObject.title;
    vm.params = $stateParams.id;
    vm.userId = currentAuth.uid
    var activate = function() {

    };
    activate();
  }

  controller.$inject = deps;
  app.controller(app.name + '.' + controllername, controller);
};

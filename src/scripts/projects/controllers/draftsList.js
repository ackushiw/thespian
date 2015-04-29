'use strict';
var controllername = 'draftsList';

module.exports = function(app) {
  /*jshint validthis: true */

  var deps = ['$famous', '$firebaseArray', 'FBURL', 'currentAuth'];

  function controller($famous, $firebaseArray, FBURL, currentAuth) {
    var vm = this;
    //famous
    var EventHandler = $famous['famous/core/EventHandler'];
    vm.scrollEvents = new EventHandler();

    //firebase
    vm.search = null;
    var draftsRef = new Firebase(FBURL + '/drafts-projects/' + currentAuth.uid).orderByChild('updated');
    vm.syncList = $firebaseArray(draftsRef);
    vm.message = 'Drafts list Hello World' + currentAuth.uid;
    var activate = function() {

    };
    activate();
  }

  controller.$inject = deps;
  app.controller(app.name + '.' + controllername, controller);
};
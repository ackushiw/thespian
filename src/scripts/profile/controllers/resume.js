'use strict';
var controllername = 'resume';

module.exports = function(app) {
  /*jshint validthis: true */

  var deps = ['currentAuth'];

  function controller(currentAuth) {
    var vm = this;
    vm.user = currentAuth.uid;
    vm.message = 'Hello World';

    var activate = function() {

    };
    activate();
  }

  controller.$inject = deps;
  app.controller(app.name + '.' + controllername, controller);
};
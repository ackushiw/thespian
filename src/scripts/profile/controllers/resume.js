'use strict';
var controllername = 'resume';

module.exports = function(app) {
  /*jshint validthis: true */

  var deps = ['currentAuth', '$mdDialog', '$log'];

  function controller(currentAuth, $mdDialog, $log) {
    var vm = this;
    vm.user = currentAuth.uid;
    vm.message = 'Hello World';

    //action button
    vm.add = function($event) {
      $log.log('open seasame');
      var parentEl = angular.element(document.body);
      $mdDialog.show({
        parent: parentEl,
        targetEvent: $event,
        template: require('../../layout/views/dialogs/resume-wizard.html'),
        locals: {
          items: 'test'
        }
      });
    };

    var activate = function() {

    };
    activate();
  }

  controller.$inject = deps;
  app.controller(app.name + '.' + controllername, controller);
};

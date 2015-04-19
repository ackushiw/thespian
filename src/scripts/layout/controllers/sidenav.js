'use strict';
var controllername = 'sidenav';

module.exports = function(app) {
  /*jshint validthis: true */

  var deps = ['$famous'];

  function controller($famous) {
    var vm = this;
    //famous
    var EventHandler = $famous['famous/core/EventHandler'];
    var Transitionable = $famous['famous/transitions/Transitionable'];
    vm.scrollEventHandler = new EventHandler();
    vm.message = 'Hello World';
    var activate = function() {
      vm.updateSize = function(height, width) {
        vm.contentSize = new Transitionable([undefined, height]);
        console.log('action height', height);
        console.log('action width', width);
        vm.contentSize.set([undefined, height]);

        if(width < 600) {
          vm.contentLayout = "column";
        } else {
          vm.contentLayout = "row";
        }

      };

    };
    activate();
  }

  controller.$inject = deps;
  app.controller(app.name + '.' + controllername, controller);
};
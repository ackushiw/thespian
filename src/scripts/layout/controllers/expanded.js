'use strict';
var controllername = 'expanded';

module.exports = function(app) {
  /*jshint validthis: true */

  var deps = ['$famous'];

  function controller($famous) {
    var vm = this;
    //famous
    var EventHandler = $famous['famous/core/EventHandler'];
    //var Engine = $famous['famous/core/Engine'];
    //var Transform = $famous['famous/core/Transform'];

    vm.scrollEventHandler = new EventHandler();
    vm.message = 'Hello Expanded World';
    var activate = function() {

    };
    activate();
  }

  controller.$inject = deps;
  app.controller(app.name + '.' + controllername, controller);
};

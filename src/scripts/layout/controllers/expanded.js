'use strict';
var controllername = 'expanded';

module.exports = function(app) {
  /*jshint validthis: true */

  var deps = ['$famous', 'currentAuth'];

  function controller($famous, auth) {
    var vm = this;
    //famous
    var EventHandler = $famous['famous/core/EventHandler'];
    //var Engine = $famous['famous/core/Engine'];
    //var Transform = $famous['famous/core/Transform'];
    var Transitionable = $famous['famous/transitions/Transitionable'];

    vm.scrollEventHandler = new EventHandler();
    vm.bannerSize = new Transitionable([0, 0]);
    vm.updateBannerSize = function (height, width) {
      vm.bannerSize.set([undefined, height]);
    };

    vm.uid = auth.uid;
    console.log(vm.uid);
    var activate = function() {

    };
    activate();
  }

  controller.$inject = deps;
  app.controller(app.name + '.' + controllername, controller);
};

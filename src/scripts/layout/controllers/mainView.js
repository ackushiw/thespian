'use strict';
var controllername = 'mainView';

module.exports = function(app) {
  /*jshint validthis: true */

  var deps = ['$famous', '$mdMedia'];

  function controller($famous, $mdMedia) {
    var vm = this;
    //famous
    var EventHandler = $famous['famous/core/EventHandler'];
    var Engine = $famous['famous/core/Engine'];
    var Transform = $famous['famous/core/Transform'];

    vm.scrollEventHandler = new EventHandler();
    vm.message = 'Hello World';
    var activate = function() {
      vm.profileMenuList = [{
        title: 'Alexander',
        link: '#',
        priority: '1',
        icon: 'mdi-account',
        type: 'header'
      }, {
        title: 'Resume',
        link: '#',
        priority: '2',
        icon: 'mdi-file-document-box',
        type: 'default'
      }, {
        title: 'Headshot',
        link: '#',
        priority: '2',
        icon: 'mdi-file-image-box',
        type: 'default'
      }, {
        title: 'Reel',
        link: '#',
        priority: '2',
        icon: 'mdi-filmstrip',
        type: 'default'
      }, {
        title: 'News',
        link: '#',
        priority: '2',
        icon: 'mdi-newspaper',
        type: 'default'

      }, {
        title: 'Companies',
        link: '#',
        priority: '2',
        icon: 'mdi-google-circles-communities',
        type: 'default'

      }];
      // Engine.on('prerender', function() { // make this into a separate directive... grab element
      //
      //   // Divide by scalar to get effect
      //
      //   var parallaxEffect = 2.0
      //   var bgPos = -contentScrollview.getPosition() / parallaxEffect;
      //
      //   vm.imageView.state.setTransform(Transform.translate(0, bgPos, 0));
      //
      // });

    };
    activate();
  }

  controller.$inject = deps;
  app.controller(app.name + '.' + controllername, controller);
};
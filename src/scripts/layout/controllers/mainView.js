'use strict';
var controllername = 'mainView';

module.exports = function(app) {
  /*jshint validthis: true */

  var deps = ['$famous', '$mdMedia', '$firebaseObject', 'FBURL', 'currentAuth', '$log'];

  function controller($famous, $mdMedia, $firebaseObject, FBURL, currentAuth, $log) {
    var vm = this;
    //firebase
    var googleData = new Firebase(FBURL + '/userDir/' + currentAuth.uid);
    var userData = new Firebase(FBURL + '/actorsProfiles/' + currentAuth.uid);
    //famous
    var EventHandler = $famous['famous/core/EventHandler'];
    //var Engine = $famous['famous/core/Engine'];
    //var Transform = $famous['famous/core/Transform'];

    vm.scrollEventHandler = new EventHandler();
    vm.message = 'Hello World';
    var activate = function() {
      vm.googleProfile = $firebaseObject(googleData);
      vm.userProfile = $firebaseObject(userData);
      $log.log('firebase object', vm.googleProfile);
      vm.userPicture = vm.googleProfile.picture;
      vm.profileMenuList = [{
        title: 'About',
        link: 'app.profile.stats',
        priority: '1',
        icon: 'mdi-account',
        type: 'header'
      }, {
        title: 'Resume',
        link: 'app.profile.resume',
        priority: '2',
        icon: 'mdi-file-document-box',
        type: 'default'
      }, {
        title: 'Pictures',
        link: 'app.profile.pictures',
        priority: '2',
        icon: 'mdi-file-image-box',
        type: 'default'
      }, {
        title: 'Videos',
        link: 'app.profile.videos',
        priority: '2',
        icon: 'mdi-filmstrip',
        type: 'default'
      }, {
        title: 'Articles & Reviews',
        link: 'app.profile.news',
        priority: '2',
        icon: 'mdi-newspaper',
        type: 'default'

      }, {
        title: 'Groups',
        link: 'app.profile.groups',
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

'use strict';
var controllername = 'pictures';

module.exports = function(app) {
  /*jshint validthis: true */
  var deps = ['FBURL', '$firebaseObject', 'currentAuth', 'main.api.uploadS3', '$window'];

  function controller(FBURL, $firebaseObject, currentAuth, uploadS3, $window) {
    var vm = this;

    var headshotRef = new Firebase(FBURL + '/actor-headshots/'+ currentAuth.uid);
    var bannerRef = new Firebase(FBURL + '/actor-banner/'+ currentAuth.uid);
    vm.headshot = $firebaseObject(headshotRef);
    vm.banner = $firebaseObject(bannerRef);
    vm.message = 'Hello World';
    vm.driveFiles = [];
    vm.test = function(data) {
      console.log('test', data);
    };

    var activate = function() {
      function headshotUploadProgress(loaded) {
        vm.headshotUploadProgress = loaded;
      }
      function bannerUploadProgress(loaded) {
        vm.bannerUploadProgress = loaded;
      }
      vm.uploadHeadshot = function(data) {
        var file = data[0];
        console.log('uploading');
        console.log(file);

        if(file) {
          //uploadS3.put(data, 'actor-headshots');
          uploadS3.upload(data, 'actor-headshots', headshotUploadProgress);
        } else {
          console.error('no file:', data);
        }

      };
      vm.uploadBanner = function(data) {
        var file = data[0];
        console.log('uploading banner');
        console.log(file);

        if(file) {
          //uploadS3.put(data, 'actor-banners');
          uploadS3.upload(data, 'actor-banner', bannerUploadProgress);
        } else {
          console.error('no file:', data);
        }

      };

    };
    activate();
  }

  controller.$inject = deps;
  app.controller(app.name + '.' + controllername, controller);
};

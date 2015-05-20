'use strict';
var controllername = 'pictures';

module.exports = function(app) {
  /*jshint validthis: true */
  var deps = ['FBURL', '$firebaseObject', 'currentAuth', 'main.api.uploadS3', '$cacheFactory', '$window', '$log'];

  function controller(FBURL, $firebaseObject, currentAuth, uploadS3, $cacheFactory, $window, $log) {
    var vm = this;

    var headshotRef = new Firebase(FBURL + '/actor-headshots/' + currentAuth.uid);
    var bannerRef = new Firebase(FBURL + '/actor-banner/' + currentAuth.uid);
    vm.headshot = $firebaseObject(headshotRef);
    vm.banner = $firebaseObject(bannerRef);
    vm.uid = currentAuth.uid;
    vm.driveFiles = [];
    vm.test = function(data) {
      $log.log('test', data);
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
        $log.log('uploading');
        $log.log(file);

        if(file) {
          //uploadS3.put(data, 'actor-headshots');
          uploadS3.upload(data, 'actor-headshots', currentAuth.uid, headshotUploadProgress);
        } else {
          $log.error('no file:', data);
        }

      };
      vm.uploadBanner = function(data) {
        var file = data[0];
        $log.log('uploading banner');
        $log.log(file);

        if(file) {
          //uploadS3.put(data, 'actor-banners');
          uploadS3.upload(data, 'actor-banner', currentAuth.uid, bannerUploadProgress);
        } else {
          $log.error('no file:', data);
        }

      };

    };
    activate();
  }

  controller.$inject = deps;
  app.controller(app.name + '.' + controllername, controller);
};

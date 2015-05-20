'use strict';
/*eslint consistent-this:[2,  "fireUploadCtrl"] */
var directivename = 'fireUpload';

module.exports = function(app) {

  // controller
  var controllerDeps = ['FBURL', '$firebaseObject', 'main.api.uploadS3', '$window', '$log'];
  var controller = function(FBURL, $firebaseObject, uploadS3, $window, $log) {
    var vm = this;
    if(!vm.id) {
      $log.warn('please add id attribute to reference to objects location in firebase');
    }
    if(!vm.location) {
      $log.warn('please set location, this will be the location in firebase and s3');
    }
    var ref = new Firebase(FBURL + '/' + vm.location + '/' + vm.id);
    vm.fireFile = $firebaseObject(ref);
    vm.image = vm.placeholder;
    vm.fireFile.$loaded().then(function(data) {
      $log.log('loaded', data);
      vm.image = data.url + '?r=' + Math.random().toString(36).substring(7);
    });

    function success() {
      $log.log('Finished!', $window);
      $firebaseObject(ref).$loaded().then(function(data) {
        vm.image = data.url + '?r=' + Math.random().toString(36).substring(7);
      });
    }

    function uploadProgress(loaded) {
      vm.uploadProgress = loaded;
      if(loaded === 100) {
        success();
      }
    }
    vm.validate = function (files) {
      $log.log('files', files[0]);
    };
    vm.upload = function(data, event, rejected) {
      var file = data[0];
      if(file) {
        $log.log('upload started', file);
        uploadS3.upload(data, vm.location, vm.id, uploadProgress);
      } else {
        $log.warn('no file:', data);
      }
      if (rejected) {
        $log.log('rejected', vm.accept);
      }

    };
    vm.directivename = directivename;
  };
  controller.$inject = controllerDeps;

  /*eslint-disable consistent-this */

  // directive
  var directiveDeps = [];
  var directive = function() {
    return {
      restrict: 'AE',
      scope: {
        title: '@', // '@' reads attribute value, '=' provides 2-way binding, '&" works with functions
        location: '@',
        accept: '@',
        buttonAccept: '@',
        id: '@',
        placeholder: '@'
      },
      controller: controller,
      controllerAs: 'fireUploadCtrl',
      bindToController: true,
      template: require('./fireUpload.html'),
      compile: function(tElement, tAttrs) {
        return {
          pre: function(scope, element, attrs) {

          },
          post: function(scope, element, attrs) {

          }
        };
      }
    };
  };
  directive.$inject = directiveDeps;

  app.directive(directivename, directive);
};

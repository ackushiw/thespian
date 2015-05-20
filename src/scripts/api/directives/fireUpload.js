'use strict';
 /*eslint consistent-this:[2,  "fireUploadCtrl"] */
var directivename = 'fireUpload';

module.exports = function(app) {

    // controller
    var controllerDeps = ['uploadS3', '$log'];
    var controller = function(uploadS3, $log) {
        var vm = this;
        if (!vm.location) {
          console.error('please set location, this will be the location in firebase and s3');
        }
        function uploadProgress(loaded) {
          vm.headshotUploadProgress = loaded;
        }
        vm.upload = function(data) {
          var file = data[0];
          $log.log('upload started', file);

          if(file) {
            uploadS3.upload(data, vm.location, uploadProgress);
          } else {
            $log.error('no file:', data);
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

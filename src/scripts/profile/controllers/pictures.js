'use strict';
var controllername = 'pictures';

module.exports = function(app) {
  /*jshint validthis: true */
  var deps = ['FBURL', '$firebaseObject', 'currentAuth', 'Upload', '$window'];

  function controller(FBURL, $firebaseObject, currentAuth, Upload, $window) {
    var vm = this;
    var AWS = $window.AWS;

    AWS.config.credentials.get(function(err) {
      if(!err) {
        vm.amzId = AWS.config.credentials.identityId;
        vm.amzKey = AWS.config.credentials.accessKeyId;
        console.log('Cognito Identity Id: ', vm.amzId);
      }
    });

    vm.message = 'Hello World';
    vm.driveFiles = [];
    vm.test = function(data) {
      console.log('test', data);
    };
    var activate = function() {

      vm.uploadHeadshot = function(data) {
        var file = data[0];
        console.log('uploading');
        console.log(file);
        if (file) {
          Upload.upload({
            url: 'https://thespus-actor-headshots.s3.amazonaws.com/', //S3 upload url including bucket name
            method: 'POST',
            fields: {
              key: file.name, // the key to store the file on S3, could be file name or customized
              AWSAccessKeyId: vm.amzKey,
              acl: 'public-read', // sets the access to the uploaded file in the bucket: private or public
              policy: vm.amzPolicy, // base64-encoded json policy (see article below)
              signature: vm.amzSignature, // base64-encoded signature based on policy string (see article below)
              'Content-Type': file.type !== '' ? file.type : 'application/octet-stream', // content type of the file (NotEmpty)
              filename: file.name // this is needed for Flash polyfill IE8-9
            },
            file: file,
          }).progress(function(evt) {
            vm.headshotUploadProgress = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + parseInt(100.0 * evt.loaded / evt.total) + '% file :' + evt.config.file.name);
          }).success(function(data, status, headers, config) { // file is uploaded successfully
            console.log('file ' + config.file.name + 'is uploaded successfully. Response: ' + data);
          }).error(function (error) {
            console.error('upload error: ', error);
          });
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

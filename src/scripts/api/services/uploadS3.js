'use strict';
var servicename = 'uploadS3';

module.exports = function(app) {

  var dependencies = ['AWSService', 'Upload', 'FBURL', 'main.layout.auth', '$window', '$q', '$log'];

  function service(AWSService, Upload, FBURL, auth, $window, $q, $log) {
    var amzId, amzKey;
    var AWS = $window.AWS;

    AWS.config.credentials.get(function(err) {
      if(!err) {
        amzId = AWS.config.credentials.identityId;
        amzKey = AWS.config.credentials.accessKeyId;
        $log.log('Cognito Identity Id: ', amzId);
      }
    });

    return {
      Bucket: 'thespus-',
      put: function(items, location, objectId) {
        var defer = $q.defer();
        auth.$waitForAuth().then(function(authData) {
          $log.log(authData.token);
          AWSService.setToken(authData.token);
          AWSService.s3({
            params: {
              Bucket: service.Bucket + location
            }
          }).then(function(s3) {
            var file = items[0];
            var params = {
              Key: file.name,
              Body: file,
              ContentType: file.type
            };

            s3.putObject(params, function(err, data) {
              if(!err) {
                var params = {
                  Bucket: service.Bucket + location,
                  Key: file.name,
                  Expires: 900 * 4
                };
                s3.getSignedUrl('getObject', params, function(error, url) {
                  if(!error) {
                    var ref = new Firebase(FBURL + '/' + location + '/' + authData.uid);
                    var fireFile = {
                      name: file.name,
                      type: file.type,
                      size: file.size,
                      url: url
                    };
                    ref.setWithPriority(fireFile, auth.google.displayName);
                  } else {
                    $log.error(error);
                  }

                });
              } else {
                $log.error(err);
              }

            });

          });
        });

        return defer.promise;
      },
      upload: function(data, location, objectId, uploadProgress) {
        auth.$waitForAuth().then(function(authData) {
          $log.log(AWSService.credentials());
          //AWSService.setToken(authData.token);
          AWS.config.credentials.get(function() {
            // Access AWS resources here.
            $log.log('cognito available?', AWS.config.credentials);
          });
          var file = data[0];
          var fname = file.name;
          var fileId = objectId || authData.uid;
          file.ext = fname.substr((~-fname.lastIndexOf('.') >>> 0) + 2); // jshint ignore:line
          //var authData = auth.$getAuth();
          var bucketUrl = 'https://thespus-' + location + '.s3.amazonaws.com/';
          $log.log(bucketUrl);
          Upload.upload({
            url: bucketUrl, //S3 upload url including bucket name
            method: 'POST',
            fields: {
              key: fileId + '-' + location + '.' + file.ext, // the key to store the file on S3, could be file name or customized
              AWSAccessKeyId: amzId,
              acl: 'public-read', // sets the access to the uploaded file in the bucket: private or public
              //policy: vm.amzPolicy, // base64-encoded json policy (see article below)
              //signature: vm.amzSignature, // base64-encoded signature based on policy string (see article below)
              'Content-Type': file.type !== '' ? file.type : 'application/octet-stream', // content type of the file (NotEmpty)
              filename: fileId + '-' + location + '.' + file.ext // this is needed for Flash polyfill IE8-9
            },
            file: file
          }).progress(function(evt) {

            var fileUploadData = parseInt(100.0 * evt.loaded / evt.total);
            uploadProgress(fileUploadData);
            $log.log('progress: ' + parseInt(100.0 * evt.loaded / evt.total) + '% file :' + evt.config.file.name);
          }).success(function(data, status, headers, config) { // file is uploaded successfully
            $log.log('file ' + config.file.name + 'is uploaded successfully. Response: ', data);
            $log.log('config', config);
            $log.log('headers', headers);
            $log.log('status', status);
            var ref = new Firebase(FBURL + '/' + location + '/' + fileId);
            var fireFile = {
              creator: authData.uid,
              name: file.name,
              type: file.type,
              size: file.size,
              ext: file.ext,
              url: config.url + config.fields.key,
              lastModified: file.lastModified,
              uploaded: Firebase.ServerValue.TIMESTAMP
            };
            ref.setWithPriority(fireFile, authData.google.displayName);
          }).error(function(error) {
            $log.error('upload error: ', error);
          });
        });
      }

    };

  }
  service.$inject = dependencies;
  app.factory(app.name + '.' + servicename, service);
};

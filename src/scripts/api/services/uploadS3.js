'use strict';
var servicename = 'uploadS3';

module.exports = function(app) {

  var dependencies = ['AWSService', 'Upload', 'FBURL', 'main.layout.auth', '$window', '$q', '$log'];

  function service(AWSService, Upload, FBURL, auth, $window, $q, $log) {

    return {
      put: function(items, location, objectId) {
        var defer = $q.defer();
        var bucket = 'thespus-' + location;
        var fireAuth = auth.$getAuth();
        AWSService.credentials().then(function(authData) {
          $log.warn(auth.google);
          AWSService.s3({
            params: {
              Bucket: bucket
            }
          }).then(function(s3) {
            var file = items[0];
            var fname = file.name;
            var fileId = objectId;
            file.ext = fname.substr((~-fname.lastIndexOf('.') >>> 0) + 2); // jshint ignore:line

            var params = {
              //ACL: 'public-read',
              Key: fileId + '-' + location + '.' + file.ext,
              Body: file,
              // Metadata: {
              //   uid: fireAuth.uid,
              //   owner: fireAuth.google.displayName,
              //   ext: file.ext
              // },
              ContentType: file.type

            };

            s3.putObject(params, function(err, data) {
              $log.log('s3 data', data);
              if(!err) {
                var params = {
                  Bucket: bucket,
                  Key: fileId + '-' + location + '.' + file.ext,
                  Expires: 900 * 4
                };
                s3.getSignedUrl('getObject', params, function(error, url) {
                  if(!error) {
                    var ref = new Firebase(FBURL + '/' + location + '/' + fileId);
                    var fireFile = {
                      creator: fireAuth.uid,
                      name: file.name,
                      type: file.type,
                      size: file.size,
                      ext: file.ext,
                      url: 'https://s3.amazonaws.com/' + bucket + '/' + fileId + '-' + location + '.' + file.ext,
                      lastModified: file.lastModified,
                      uploaded: Firebase.ServerValue.TIMESTAMP
                    };
                    ref.setWithPriority(fireFile, fireAuth.google.displayName);
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
        AWSService.credentials().then(function(authData) {
          var fireAuth = auth.$getAuth();
          $log.log(authData);
          //accessKeyId
          //secretAccessKey
          //expired
          var file = data[0];
          var fname = file.name;
          var fileId = objectId;
          file.ext = fname.substr((~-fname.lastIndexOf('.') >>> 0) + 2); // jshint ignore:line
          //var authData = auth.$getAuth();
          var bucketUrl = 'https://thespus-' + location + '.s3.amazonaws.com/';
          $log.log(bucketUrl);
          Upload.upload({
            url: bucketUrl, //S3 upload url including bucket name
            method: 'POST',
            fields: {
              key: fileId + '-' + location + '.' + file.ext, // the key to store the file on S3, could be file name or customized
              AWSAccessKeyId: authData.accessKeyId,
              AWSSecretAccessKey: authData.secretAccessKey,
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
              creator: fireAuth.uid,
              name: file.name,
              type: file.type,
              size: file.size,
              ext: file.ext,
              url: config.url + config.fields.key,
              lastModified: file.lastModified,
              uploaded: Firebase.ServerValue.TIMESTAMP
            };
            ref.setWithPriority(fireFile, fireAuth.google.displayName);
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

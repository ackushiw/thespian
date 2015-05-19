'use strict';
require('angular-ui-router');
require('famous-angular');
require('ngCordova');

var modulename = 'api';

module.exports = function(namespace) {

  var fullname = namespace + '.' + modulename;

  var angular = require('angular');
  var app = angular.module(fullname, ['ui.router', 'famous.angular', 'ngCordova']);
  // inject:folders start
  require('./services')(app);
  // inject:folders end

  app.provider('AWSService', function() {
    var self = this;
    self.arn = null;

    self.setArn = function(arn) {
      if(arn) {
        self.arn = arn;
      }
    };
    self.$get = ['$window', '$cacheFactory', '$q', function($window, $cacheFactory, $q) {
      var AWS = $window.AWS;
      var credentialsDefer = $q.defer(),
        credentialsPromise = credentialsDefer.promise;
      var s3Cache = $cacheFactory('s3Cache');
      return {
        credentials: function() {
          return credentialsPromise;
        },
        setToken: function(token, providerId) {

          var config = {
            RoleArn: self.arn,
            WebIdentityToken: token,
            RoleSessionName: 'thespus-web'
          };
          if(providerId) {
            config['providerId'] = providerId;
          }

          self.config = config;
          AWS.config.credentials = new AWS.WebIdentityCredentials(config);
          credentialsDefer.resolve(AWS.config.credentials);
        },
        s3: function(params) {
          var defer = $q.defer();
          credentialsPromise.then(function() {
            var s3Object = s3Cache.get(JSON.stringify(params));
            if (!s3Object) {
                s3Object = new AWS.S3(params);
                s3Cache.put(JSON.stringify(params), s3Object);
            }

            defer.resolve(s3Object);
          });

          return defer.promise;
        }
      };
    }];
  });
  app.config(['AWSServiceProvider', function(AWSServiceProvider) {
    AWSServiceProvider.setArn('arn:aws:iam::235088159752:role/firebase-google');
  }]);

  return app;
};

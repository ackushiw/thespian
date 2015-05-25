'use strict';
var servicename = 'cognito';

module.exports = function(app) {

  var dependencies = ['AWSService'];

  function service(AWSService) {
    //var AWS = $window.AWS;
    //var auth = AWS.config.credentials;

    function initFacebook(token, callback) {
      var config = {
        IdentityPoolId: 'us-east-1:44475292-5246-4fdb-ad6d-b3668187d9f8',
        RoleArn: 'arn:aws:iam::235088159752:role/Cognito_thespusAuth_Role',
        Logins: {
          'graph.facebook.com': token

        },
        RoleSessionName: 'web-thespus'
      };
      AWSService.setToken(config);
      callback(AWSService.credentials);
    }

    function initGoogle(token, callback) {
      var config = {
        IdentityPoolId: 'us-east-1:44475292-5246-4fdb-ad6d-b3668187d9f8',
        RoleArn: 'arn:aws:iam::235088159752:role/Cognito_thespusAuth_Role',
        Logins: {
          'accounts.google.com': token
        },
        RoleSessionName: 'web-thespus'
      };
      AWSService.setToken(config);
      callback(AWSService.credentials);
    }

    function set(cognitoAuth) {
      service.auth = cognitoAuth;
      service.signedIn = true;
      //accessKeyId
      //secretAccessKey

    }

    return {
      auth: AWSService.credentials,
      initFacebook: initFacebook,
      initGoogle: initGoogle,
      set: set,
      signedIn: null
    };

  }
  service.$inject = dependencies;
  app.factory(app.name + '.' + servicename, service);
};

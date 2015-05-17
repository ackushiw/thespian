'use strict';
require('angular-ui-router');
require('famous-angular');
require('ngCordova');
require('angular-google-picker');

var modulename = 'google';

module.exports = function(namespace) {

  var fullname = namespace + '.' + modulename;

  var angular = require('angular');
  var app = angular.module(fullname, ['ui.router', 'famous.angular', 'ngCordova', 'lk-google-picker']);
  // inject:folders start
  require('./services')(app);
  // inject:folders end

  app.constant('googleApiKey', 'AIzaSyA-mjOqwdMYO2dKlPGvCqwGOGm5NvTJ-zE');
  app.constant('googleProjectId', 'thespus');
  app.constant('googleClientId', '507465006069-ui5p52nf7g9k5pjl2atv3fjs7kp3ssla.apps.googleusercontent.com');
  app.constant('groupId', 'groupId');
  //google drive config
  app.config(['lkGoogleSettingsProvider', 'googleApiKey', 'googleClientId', function(lkGoogleSettingsProvider, googleApiKey, googleClientId) {

    lkGoogleSettingsProvider.configure({
      apiKey: googleApiKey,
      clientId: googleClientId,
      scopes: ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/photos'],
      locale: 'us',
      features: ['SIMPLE_UPLOAD_ENABLED', 'MINE_ONLY'],
      views: ['PhotosView()', 'DocsUploadView()', 'DocsView()']
    });
  }]);

  return app;
};

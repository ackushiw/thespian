'use strict';
var servicename = 'google';

module.exports = function(app) {

  var dependencies = ['$window'];

  function service($window) {
    var GAPI = $window.gapi;

    function signIn(params) {
      GAPI.auth.signIn(params);
    }

    return {
      signIn: signIn
    };

  }
  service.$inject = dependencies;
  app.factory(app.name + '.' + servicename, service);
};

'use strict';
var servicename = 'initializeUser';
//this serive is to check if the user has accessed the app before and if not to set up his profile
module.exports = function(app) {

  var dependencies = ['$firebaseObject', 'FBURL', '$firebaseAuth'];

  function service($firebaseObject, FBURL, $firebaseAuth) {
    var baseRef = new Firebase(FBURL);
    var auth = $firebaseAuth(baseRef);
    var googleRef = new Firebase(FBURL + '/userDir/' + auth.uid);
    var googleObj = $firebaseObject(googleRef);
    var userStatsRef = new Firebase(FBURL + '/actorsProfiles/' + auth.uid);

    googleRef.transaction(function(currentData) {
      if(currentData === null) {
        return auth.google.cachedUserProfile;
      } else {
        return undefined;
      }
    });

    var add = function(a, b) {
      return a + b;
    };

    return {
      add: add
    };

  }
  service.$inject = dependencies;
  app.factory(app.name + '.' + servicename, service);
};
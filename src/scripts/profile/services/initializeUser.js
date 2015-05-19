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
    var userProfileRef = new Firebase(FBURL + '/actorsProfiles/' + auth.uid);
    var googleProfile = auth.google.cachedUserProfile;
    var defaultProfile = {
      actorName: googleProfile.name,
      headshot: googleProfile.picture
    };

    return function (uid, callback) {
      // body...
      if (uid == auth.uid) {
        console.log('user ids match');
        userProfileRef.child('actorName').set(googleProfile.name);
        userProfileRef.child('headshot').set(googleProfile.picture);
        callback(auth.uid);
      } else {
        console.error('user ids do not match');
        if (uid) {

        } else {

        }
      }
    };



  }
  service.$inject = dependencies;
  app.factory(app.name + '.' + servicename, service);
};

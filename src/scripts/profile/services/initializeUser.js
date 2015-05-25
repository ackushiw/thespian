'use strict';
var servicename = 'initializeUser';
//this serive is to check if the user has accessed the app before and if not to set up his profile
module.exports = function(app) {

  var dependencies = ['$firebaseObject', 'FBURL', '$firebaseAuth', '$log'];

  function service($firebaseObject, FBURL, $firebaseAuth, $log) {
    var baseRef = new Firebase(FBURL);
    var auth = $firebaseAuth(baseRef);
    //var googleRef = new Firebase(FBURL + '/userDir/' + auth.uid);
    //var googleObj = $firebaseObject(googleRef);
    var userProfileRef = new Firebase(FBURL + '/actorsProfiles/' + auth.uid);
    var googleProfile = auth.google.cachedUserProfile;
    // var defaultProfile = {
    //   actorName: googleProfile.name,
    //   headshot: googleProfile.picture
    // };

    return function(uid, callback) {

      if(uid === auth.uid) {
        $log.log('user ids match');
        userProfileRef.child('actorName').set(googleProfile.name);
        userProfileRef.child('headshot').set(googleProfile.picture);
        callback(auth.uid);
      } else {
        $log.error('user ids do not match');
        // if (uid) {
        //
        // } else {
        //
        // }
      }
    };

  }
  service.$inject = dependencies;
  app.factory(app.name + '.' + servicename, service);
};

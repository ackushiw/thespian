'use strict';
var servicename = 'profileData';

module.exports = function(app) {

  var dependencies = ['FBURL', '$firebaseObject', 'main.profile.initializeUser', '$log'];

  function service(FBURL, $firebaseObject, initializeUser, $log) {
    //this service syncs the user's profile data @ location
    var profilesLocation = FBURL + '/actorsProfiles/';
    //return profile
    function userObject(uid) {
      if(uid) {
        var ref = new Firebase(profilesLocation + uid);
        return $firebaseObject(ref);
      } else {
        $log.error('please inject the user ID');
      }
    }

    function userExistsCallback(uid, exists) {
      if(uid && exists) {
        userObject(uid);
      } else if(uid && !exists) {
        //create profile
        initializeUser(uid, userObject);
      }
    }

    // Tests to see if /profilesLocation/<userId> has any data.
    function checkIfUserExists(userId) {
      var usersRef = new Firebase(profilesLocation);
      usersRef.child(userId).once('value', function(snapshot) {
        var exists = snapshot.exists();
        userExistsCallback(userId, exists);
      });
    }

    return {
      get: userObject,
      check: checkIfUserExists
    };

  }
  service.$inject = dependencies;
  app.factory(app.name + '.' + servicename, service);
};

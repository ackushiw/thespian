'use strict';
var servicename = 'auth';

module.exports = function(app) {

  var dependencies = ['$mdDialog', '$firebaseAuth', 'AWSService', '$state', 'FBURL', '$log'];

  function service($mdDialog, $firebaseAuth, AWSService, $state, FBURL, $log) {
    var ref = new Firebase(FBURL);
    var auth = $firebaseAuth(ref);

    function disconnect() {
      var confirm = $mdDialog.confirm()
        .title('Login?')
        .content('Please login to see this page.')
        .ariaLabel('Login')
        .ok('Login')
        .cancel('Cancel')
        .hasBackdrop(true);
      $mdDialog.show(confirm).then(function() {
        Firebase.goOnline();
        auth.$authWithOAuthPopup('google').then(function(authData) {
          $state.reload();
        }).catch(function(error) {
          $log.error('Authentication failed:', error);
        });
      }, function() {
        $log.log('login canceled');
        $state.go('landing');
      });

    }
    ref.onAuth(function(data) {
      if(data) {
        $log.log('authService', data);
        var googleProfile = data.google.cachedUserProfile;
        var userStatusUrl = FBURL + '/userDir/' + data.uid;
        var userPresenceRef = new Firebase(userStatusUrl + '/online');
        var userRef = new Firebase(FBURL + '/userDir');
        var lastOnlineRef = new Firebase(userStatusUrl + '/lastOnline');

        AWSService.setToken(auth.token, null, data.uid);

        userPresenceRef.once('value', function(snap) {
          if(snap.val() === true) {

            googleProfile.updated = Firebase.ServerValue.TIMESTAMP;

            userRef.child(data.uid).set(googleProfile);

            userPresenceRef.onDisconnect().set(false);
            lastOnlineRef.onDisconnect().set(Firebase.ServerValue.TIMESTAMP);
          } else {
            disconnect();
          }
        });
      } else {
        Firebase.goOffline();
        $log.error('No authenticated user');
        disconnect();
      }
    });

    return auth;

  }
  service.$inject = dependencies;
  app.factory(app.name + '.' + servicename, service);
};

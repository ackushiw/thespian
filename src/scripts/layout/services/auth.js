'use strict';
var servicename = 'auth';

module.exports = function(app) {

  var dependencies = ['$mdDialog', '$firebaseAuth', '$state', 'FBURL', '$log'];

  function service($mdDialog, $firebaseAuth, $state, FBURL, $log) {
    var ref = new Firebase(FBURL);

    function disconnect() {

    }
    ref.onAuth(function(data) {
      if(data) {
        $log.log('authService', data);
        var userStatusUrl = FBURL + '/user-status/' + data.uid;
        var userPresenceRef = new Firebase(userStatusUrl + '/online');
        var connectionsRef = new Firebase(userStatusUrl + '/connections');
        var lastOnlineRef = new Firebase(userStatusUrl + '/lastOnline');
        userPresenceRef.once('value', function(snap) {
          if(snap.val() === true) {
            var connectionDetails = {
              time: Firebase.ServerValue.TIMESTAMP
            };
            var con = connectionsRef.push(connectionDetails);
            con.onDisconnect().remove();
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

    return $firebaseAuth(ref);

  }
  service.$inject = dependencies;
  app.factory(app.name + '.' + servicename, service);
};
'use strict';
var servicename = 'auth';

module.exports = function(app) {

  var dependencies = ['$firebaseAuth', 'FBURL'];

  function service($firebaseAuth, FBURL) {
    var ref = new Firebase(FBURL)

    return $firebaseAuth(ref);

  }
  service.$inject = dependencies;
  app.factory(app.name + '.' + servicename, service);
};
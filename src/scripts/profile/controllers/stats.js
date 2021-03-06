'use strict';
var controllername = 'stats';

module.exports = function(app) {
  /*jshint validthis: true */

  var deps = ['$scope', '$famous', '$firebaseObject', '$firebaseArray', 'FBURL', 'currentAuth', '$log'];

  function controller($scope, $famous, $firebaseObject, $firebaseArray, FBURL, currentAuth, $log) {
    var vm = this;
    var _ = require('lodash');
    vm.user = currentAuth.uid;
    //famous
    var EventHandler = $famous['famous/core/EventHandler'];
    var Transitionable = $famous['famous/transitions/Transitionable'];
    vm.scrollEventHandler = new EventHandler();
    vm.contentLayout = 'row';
    vm.updateSize = function(height, width) {
      vm.contentSize = new Transitionable([undefined, height]);
      vm.contentSize.set([undefined, height]);

      if(width < 640) {
        vm.contentLayout = 'column';
      } else {
        vm.contentLayout = 'row';
      }

    };
    //firebase
    //var googleRef = new Firebase(FBURL + '/userDir/' + currentAuth.uid);
    var userRef = new Firebase(FBURL + '/actorsProfiles/' + currentAuth.uid);
    var skillsRef = new Firebase(FBURL + '/actorsProfiles/' + currentAuth.uid + '/skills');

    //var tagsRef = new Firebase(FBURL + '/tags');

    var userObj = $firebaseObject(userRef);

    var activate = function() {
      userObj.$bindTo($scope, 'userStats').then(function() {

      });

      vm.ageRangeOptions = _.range(0, 101);

      vm.ageRange = function(lowAge, highAge) {
        $log.log('test', _.range(lowAge, highAge + 1, 1));
        $scope.userStats.ageRange = _.range(lowAge, highAge + 1);
      };

      vm.skills = $firebaseArray(skillsRef);

      function skillsSearch(query) {
        var filteredSkills = skillsRef.orderByKey().equalTo(query);
        var results = $firebaseArray(filteredSkills);
        results.$loaded().then(function(data) {
          $log.log(data);
          return data;
        }).catch(function(error) {
          $log.error('Error: ', error);
        });

      }
      vm.query = skillsSearch;

    };
    activate();
  }

  controller.$inject = deps;
  app.controller(app.name + '.' + controllername, controller);
};

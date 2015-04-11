'use strict';
var controllername = 'stats';

module.exports = function(app) {
  /*jshint validthis: true */

  var deps = ['$scope', '$firebaseObject', '$firebaseArray', 'FBURL', 'currentAuth'];

  function controller($scope, $firebaseObject, $firebaseArray, FBURL, currentAuth) {
    var vm = this;
    vm.message = currentAuth.uid;
    //firebase
    var googleRef = new Firebase(FBURL + '/userDir/' + currentAuth.uid);
    var userRef = new Firebase(FBURL + '/actorsProfiles/' + currentAuth.uid);
    var skillsRef = new Firebase(FBURL + '/actorsProfiles/' + currentAuth.uid + '/skills');
    var userObj = $firebaseObject(userRef);
    $scope.test = ['Apple', 'Banana', 'Orange'];
    $scope.vegObjs = [{
      'name': 'Broccoli',
      'type': 'Brassica'
    }, {
      'name': 'Cabbage',
      'type': 'Brassica'
    }, {
      'name': 'Carrot',
      'type': 'Umbelliferous'
    }];
    $scope.newVeg = function(chip) {
      return {
        name: chip,
        type: 'unknown'
      };
    };

    var activate = function() {
      userObj.$bindTo($scope, 'userStats').then(function() {

      });
      vm.skills = $firebaseArray(skillsRef);
      vm.newSkill = function(chip) {
        console.log(chip);
        vm.skills.$add({
          'text': chip,
          'category': 'skill'
        });
      };
      vm.action = function(chip) {
        console.log(chip);
        vm.skills.$add({
          'text': chip,
          'category': 'skill'
        });
        vm.skillsInput = null;

      }

    };
    activate();
  }

  controller.$inject = deps;
  app.controller(app.name + '.' + controllername, controller);
};
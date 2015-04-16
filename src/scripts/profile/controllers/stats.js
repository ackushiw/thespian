'use strict';
var controllername = 'stats';

module.exports = function(app) {
  /*jshint validthis: true */

  var deps = ['$scope', '$firebaseObject', '$firebaseArray', 'FBURL', 'currentAuth'];

  function controller($scope, $firebaseObject, $firebaseArray, FBURL, currentAuth) {
    var vm = this;
    vm.user = currentAuth.uid;
    //firebase
    var googleRef = new Firebase(FBURL + '/userDir/' + currentAuth.uid);
    var userRef = new Firebase(FBURL + '/actorsProfiles/' + currentAuth.uid);
    var skillsRef = new Firebase(FBURL + '/actorsProfiles/' + currentAuth.uid + '/skills');
    var tagsRef = new Firebase(FBURL + '/tags');
    //firebase index
    var file = require('firebase-index'); // make this into a factory service
    var skillsIndex = new file.FirebaseIndex(skillsRef, tagsRef);
    console.log(skillsIndex);

    var userObj = $firebaseObject(userRef);
    console.log(userObj);
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
        skillsIndex.add(
          chip
        );
      };

      vm.action = function(chip) {
        console.log(chip);
        vm.skills.$add({
          title: chip,
          category: 'skill'
        });

        vm.skillsInput = null;
      };

      function skillsSearch(query) {
        var filteredSkills = skillsRef.orderByKey().equalTo(query);
        var results = $firebaseArray(filteredSkills)
        results.$loaded().then(function(data) {
          console.log(data);
          return data;
        }).catch(function(error) {
          console.error('Error: ', error);
        });

      }
      vm.query = skillsSearch;

      vm.test = function(chip, index) {
        console.log('test', chip);
        console.log('index', index);
        vm.skills.$remove(chip.$id).then(function(ref) {
          console.log('skill removed', ref);
        }).catch(function(error) {
          console.error('Error', error);
        });
      }

    };
    activate();
  }

  controller.$inject = deps;
  app.controller(app.name + '.' + controllername, controller);
};
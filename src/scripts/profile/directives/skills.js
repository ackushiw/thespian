'use strict';
/*eslint consistent-this:[2,  "skillsCtrl"] */
var directivename = 'skills';

module.exports = function(app) {

  // controller
  var controllerDeps = ['$firebaseObject', '$firebaseArray', 'FBURL', '$log'];
  var controller = function($firebaseObject, $firebaseArray, FBURL, $log) {
    var skillsCtrl = this;

    //firebase
    var baseUrl = FBURL + '/actorsProfiles/' + skillsCtrl.userId + '/skills';
    var baseRef = new Firebase(baseUrl);
    //firebase skills
    var skillsLibUrl = FBURL + '/lib-skills';
    var skillsLibRef = new Firebase(skillsLibUrl);
    //firebase user
    var userUrl = FBURL + '/actorsProfiles/' + skillsCtrl.userId;

    function firebaseCallback(error) {
      if(error) {
        $log.error('Error: ', error);
      } else {
        $log.log('Sync Success');
      }
    }

    function addComplete(skill, error) {
      if(error) {
        $log.error('Error: ', error);
      } else {
        //Sync user into skills library
        $log.log(skill + ' user: ' + skillsCtrl.userName);
        var newSkillInLibraryUrl = skillsLibUrl + '/' + skill;
        var newSkillSync = new Firebase(newSkillInLibraryUrl);
        newSkillSync.setWithPriority({
          title: skill,
          updated: Firebase.ServerValue.TIMESTAMP
        }, skill, firebaseCallback);
        //add user to skills user index
        //var userIndex = newSkillInLibraryUrl + '/users';
        newSkillSync.child('users/' + skillsCtrl.userId).set({
          name: skillsCtrl.userName
        }, firebaseCallback);
        //update user
        var userRef = new Firebase(userUrl);
        userRef.child('updated').set(Firebase.ServerValue.TIMESTAMP);

      }
    }

    skillsCtrl.add = function(skill) {
      var lowercaseSkill = angular.lowercase(skill);
      baseRef.child(lowercaseSkill).set({
        title: lowercaseSkill,
        added: Firebase.ServerValue.TIMESTAMP
      }, addComplete(lowercaseSkill));
      skillsCtrl.newSkill = null;
    };
    skillsCtrl.array = $firebaseArray(baseRef);
    skillsCtrl.newSkill = null;
    skillsCtrl.queryList = [];

    skillsCtrl.remove = function(item) {
      var newUrl = baseUrl + '/' + item.$id;
      $log.log(item);
      var skillRef = new Firebase(newUrl);
      var skillObj = $firebaseObject(skillRef);
      skillObj.$remove().then(function(value) {
        $log.log(value);
        var libSkillsUserUrl = skillsLibUrl + '/' + item.$id + '/users/' + skillsCtrl.userId;
        var libSkillsUserRef = new Firebase(libSkillsUserUrl);
        libSkillsUserRef.remove(firebaseCallback);
      }).catch(function(err) {
        $log.error('Error: ', err);
      });
    };

    skillsCtrl.updateQuery = function(query) {
      var queryFirebase = skillsLibRef.orderByKey().startAt(query).limitToFirst(10);
      var results = $firebaseArray(queryFirebase);
      skillsCtrl.queryList = results;
    };
    skillsCtrl.directivename = directivename;
  };
  controller.$inject = controllerDeps;

  /*eslint-disable consistent-this */

  // directive
  var directiveDeps = [];
  var directive = function() {
    return {
      restrict: 'AE',
      scope: {
        title: '@', // '@' reads attribute value, '=' provides 2-way binding, '&" works with functions
        userId: '@',
        userName: '@',
        location: '@'
      },
      controller: controller,
      controllerAs: 'skillsCtrl',
      bindToController: true,
      template: require('./skills.html'),
      compile: function(tElement, tAttrs) {
        return {
          pre: function(scope, element, attrs) {

          },
          post: function(scope, element, attrs) {

          }
        };
      }
    };
  };
  directive.$inject = directiveDeps;

  app.directive(directivename, directive);
};

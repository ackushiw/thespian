'use strict';
/*eslint consistent-this:[2,  "fireTagsCtrl"] */
var directivename = 'fireTags';

module.exports = function(app) {

  // controller
  var controllerDeps = ['$firebaseObject', '$firebaseArray', 'FBURL', '$log'];
  var controller = function($firebaseObject, $firebaseArray, FBURL, $log) {
    var fireTagsCtrl = this;

    //firebase
    var baseUrl = FBURL + '/actorsProfiles/' + fireTagsCtrl.userId + '/' + fireTagsCtrl.title;
    var baseRef = new Firebase(baseUrl);
    //firebase tag
    var tagLibUrl = FBURL + '/lib-' + fireTagsCtrl.title;
    var tagLibRef = new Firebase(tagLibUrl);
    //firebase user
    var userUrl = FBURL + '/actorsProfiles/' + fireTagsCtrl.userId;

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
        //Sync user into tag library
        $log.log(skill + ' user: ' + fireTagsCtrl.userName);
        var newTagInLibraryUrl = tagLibUrl + '/' + skill;
        var newTagSync = new Firebase(newTagInLibraryUrl);
        newTagSync.setWithPriority({
          title: skill,
          updated: Firebase.ServerValue.TIMESTAMP
        }, skill, firebaseCallback);
        //add user to tag user index
        var userIndex = newTagInLibraryUrl + '/users';
        newTagSync.child('users/' + fireTagsCtrl.userId).set({
          name: fireTagsCtrl.userName
        }, firebaseCallback);
        //update user
        var userRef = new Firebase(userUrl);
        userRef.child('updated').set(Firebase.ServerValue.TIMESTAMP);

      }
    }

    fireTagsCtrl.add = function(skill) {
      var lowercaseTag = angular.lowercase(skill);
      baseRef.child(lowercaseTag).set({
        title: lowercaseTag,
        added: Firebase.ServerValue.TIMESTAMP
      }, addComplete(lowercaseTag));
      fireTagsCtrl.newTag = null;
    };
    fireTagsCtrl.array = $firebaseArray(baseRef);
    fireTagsCtrl.newTag = null;
    fireTagsCtrl.queryList = [];

    fireTagsCtrl.remove = function(item) {
      var newUrl = baseUrl + '/' + item.$id;
      console.log(item);
      var skillRef = new Firebase(newUrl);
      var skillObj = $firebaseObject(skillRef);
      skillObj.$remove().then(function(value) {
        $log.log(value);
        var libTagsUserUrl = tagLibUrl + '/' + item.$id + '/users/' + fireTagsCtrl.userId;
        var libTagsUserRef = new Firebase(libTagsUserUrl);
        libTagsUserRef.remove(firebaseCallback);
      }).catch(function(err) {
        $log.error('Error: ', err);
      });
    };

    fireTagsCtrl.updateQuery = function(query) {
      var queryFirebase = tagLibRef.orderByKey().startAt(query).limitToFirst(10);
      var results = $firebaseArray(queryFirebase);
      fireTagsCtrl.queryList = results;
    };
    fireTagsCtrl.directivename = directivename;
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
      controllerAs: 'fireTagsCtrl',
      bindToController: true,
      template: require('./fireTags.html'),
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
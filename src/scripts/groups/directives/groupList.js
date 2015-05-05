'use strict';
/*eslint consistent-this:[2,  "groupListCtrl"] */
var directivename = 'groupList';

module.exports = function(app) {

  // controller
  var controllerDeps = ['$firebaseObject', 'FBURL'];
  var controller = function($firebaseObject, FBURL) {
    var groupListCtrl = this;
    var vm = groupListCtrl;
    //firebase
    var ref = new Firebase(FBURL + '/groups/' + vm.groupId);
    vm.groupObj = $firebaseObject(ref);

    groupListCtrl.directivename = directivename;
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
        groupId: '@'
      },
      controller: controller,
      controllerAs: 'groupListCtrl',
      bindToController: true,
      template: require('./groupList.html'),
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
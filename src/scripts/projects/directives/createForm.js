'use strict';
/*eslint consistent-this:[2,  "createFormCtrl"] */
var directivename = 'createForm';

module.exports = function(app) {

  // controller
  var controllerDeps = ['$scope', '$firebaseObject', 'FBURL', '$log'];
  var controller = function($scope, $firebaseObject, FBURL, $log) {
    var createFormCtrl = this;
    var vm = createFormCtrl;
    vm.message = vm.user;
    //firebase
    var ref = new Firebase(FBURL + '/drafts-projects/' + vm.user + '/' + vm.id);
    var draftObj = $firebaseObject(ref);
    draftObj.$bindTo($scope, 'project').then(function() {
      $log.log('object bound');
    });
    createFormCtrl.directivename = directivename;
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
        id: '@',
        user: '@'
      },
      controller: controller,
      controllerAs: 'createFormCtrl',
      bindToController: true,
      template: require('./createForm.html'),
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
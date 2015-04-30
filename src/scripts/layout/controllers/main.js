'use strict';
var controllername = 'main';

module.exports = function(app) {
  /*jshint validthis: true */

  var deps = ['$rootScope', '$mdMedia', '$mdDialog', '$famous', '$timeline', 'FBURL', 'currentAuth', '$window', '$log'];

  function controller($rootScope, $mdMedia, $mdDialog, $famous, $timeline, FBURL, currentAuth, $window, $log) {
    var vm = this;

    //init
    $rootScope.smScreen = $mdMedia('sm');
    $rootScope.gtSmScreen = $mdMedia('gt-sm');
    $rootScope.mdScreen = $mdMedia('md');
    $rootScope.gtMdScreen = $mdMedia('gt-md');
    $rootScope.lgScreen = $mdMedia('lg');
    $rootScope.gtLgScreen = $mdMedia('gt-lg');

    //famous
    var Transitionable = $famous['famous/transitions/Transitionable'];
    var Easing = $famous['famous/transitions/Easing'];
    var EventHandler = $famous['famous/core/EventHandler'];

    // tests
    vm.message = 'Hello World';
    console.log('mainCtrl:', currentAuth);
    vm.test = function() {
      $log.log('test button');
    }

    //activate functions
    var activate = function() {
      vm.openResumeWizard = function($event) {
        //firebase
        var draftsRef = new Firebase(FBURL + '/drafts-projects/' + currentAuth.uid);
        var currentProject = draftsRef.push({
          creator: currentAuth.uid,
          updated: Firebase.ServerValue.TIMESTAMP
        });
        $log.log('open app seasame');
        var parentEl = angular.element(document.body);
        $mdDialog.show({
          parent: parentEl,
          targetEvent: $event,
          template: require('../views/dialogs/resume-wizard.html'),
          locals: {
            draftObj: currentProject,
            items: 'test'
          },
          controller: 'main.projects.create',
          controllerAs: 'projectCreateCtrl'
        });
      };
      vm.openGroupWizard = function($event) {
        $log.log('open group seasame');
        //firebase
        var groupsRef = new Firebase(FBURL + '/groups-projects/' + currentAuth.uid);
        var currentGroup = groupsRef.push({
          creator: currentAuth.uid,
          updated: Firebase.ServerValue.TIMESTAMP
        });
        var parentEl = angular.element(document.body);
        $mdDialog.show({
          parent: parentEl,
          targetEvent: $event,
          template: require('../views/dialogs/groups-wizard.html'),
          locals: {
            groupObj: currentGroup,
            items: 'test'
          },
          controller: 'main.groups.create',
          controllerAs: 'groupCreateCtrl'
        });
      };

    };
    activate();
  }

  controller.$inject = deps;
  app.controller(app.name + '.' + controllername, controller);
};
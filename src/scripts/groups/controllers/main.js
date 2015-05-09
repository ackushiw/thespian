'use strict';
var controllername = 'main'; //group-page

module.exports = function(app) {
  /*jshint validthis: true */

  var deps = ['$famous', '$firebaseObject', 'FBURL', '$stateParams', '$timeout','$q', '$log']; //resolve : groupId

  function controller($famous, $firebaseObject, FBURL, $stateParams, $timeout,$q, $log) {
    var vm = this;
    //$log.log($stateParams.id);
    //famous
    var EventHandler = $famous['famous/core/EventHandler'];
    vm.scrollEvents = new EventHandler();

    //firebase
    var ref = new Firebase(FBURL + '/groups/' + $stateParams.id);
    vm.sync = $firebaseObject(ref);
    vm.message = 'Hello Group World';
    vm.id = $stateParams.id;
    vm.refreshMap = false;

    function refreshMap() {
      if (vm.map.control.refresh) {
        vm.map.control.refresh();
        vm.mapObject = vm.map.control.getGMap();
        console.log(vm.mapObject);
      } else {
        $log.error('no map object');
        $timeout(function() {
          $log.debug('refreshed', vm.map.control);
          refreshMap();
        }, 500);
      }
    }
    var activate = function() {
      vm.map = {
        center: {
          latitude: 45,
          longitude: -73
        },
        control: {},
        pan: false,
        zoom: 8
      };
      vm.mapSearch = {
        template: require('./views/map/search.html'),
        events: vm.mapEvents
      };
      vm.mapInit = function () {
        //console.log('test');
        refreshMap();
      };


    };
    activate();
  }

  controller.$inject = deps;
  app.controller(app.name + '.' + controllername, controller);
};

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
    var GeoFire = require('geofire');
    var geofireRef = new Firebase(FBURL + '/z-geofire');
    var geoFire = new GeoFire(geofireRef);
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
    vm.updateMap = function (location) {
      console.log('test', location);
      vm.sync.address = location.formatted_address;
      vm.sync.place_id = location.place_id;
      vm.sync.location = location.geometry.location;
      vm.sync.place_url = location.url;
      vm.sync.$save().then(function (data) {
        console.log(data);
        geoFire.set($stateParams.id, [location.geometry.location.A,location.geometry.location.F]).then(function (location) {
          console.log('data added to geofire with location: ', location);
        },function (error) {
          console.error('Error: ', error);
        });
        vm.map ={
          center: {
            latitude: vm.sync.location.A,
            longitude: vm.sync.location.F
          },
          zoom: 13
        };
        vm.map.control.refresh();
      }, function (error) {
        console.error('Error: ', error);
      });
    };
    var activate = function() {
      vm.sync.$loaded().then(function (data) {
        if (data.location) {
          vm.map = {
            center: {
              latitude: data.location.A,
              longitude: data.location.F
            },
            zoom: 13
          };
          //vm.map.control.refresh();
        }
      });
      vm.map = {
        center: {
          latitude: 0,
          longitude: 0
        },
        control: {},
        pan: false,
        zoom: 1
      };
      vm.searchMap = {
        text: null,
        details: null,
        options:{
          watchEnter: true
        }
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

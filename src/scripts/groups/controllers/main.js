'use strict';
var controllername = 'main'; //group-page

module.exports = function(app) {
  /*jshint validthis: true */

  var deps = ['$scope', '$famous', '$firebaseObject', 'FBURL', 'uiGmapGoogleMapApi', '$stateParams', '$timeout', '$q', '$log']; //resolve : groupId

  function controller($scope, $famous, $firebaseObject, FBURL, uiGmapGoogleMapApi, $stateParams, $timeout, $q, $log) {
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
    vm.sync.$bindTo($scope, 'group').then(function() {
      $log.log('bound');
    });

    function save() {
      vm.sync.$save();
    }

    function syncLocation(location) {
      console.log('test', location);
      vm.sync.address = location.formatted_address;
      vm.sync.place_id = location.place_id;
      vm.sync.location = location.geometry.location;
      vm.sync.place_url = location.url || null;
      vm.sync.$save().then(function(data) {
        console.log(data);
        geoFire.set($stateParams.id, [location.geometry.location.A, location.geometry.location.F]).then(function(location) {
          console.log('data added to geofire with location: ', location);
        }, function(error) {
          console.error('Error: ', error);
        });
        vm.map = {
          center: {
            latitude: vm.sync.location.A,
            longitude: vm.sync.location.F
          },
          zoom: 13
        };
        vm.map.marker = {
          coords: {
            latitude: vm.sync.location.A,
            longitude: vm.sync.location.F
          }
        };
      }, function(error) {
        $log.error('Error: ', error);
      });
      vm.searchMap.details = null;
    }

    //google maps
    vm.mapLoaded = false;
    vm.map = {
      center: {
        latitude: 0,
        longitude: 0
      },
      control: {},
      pan: false,
      zoom: 1,
      options: {
        scrollwheel: false
      }
    };
    uiGmapGoogleMapApi.then(function(maps) {

      vm.geocoder = new maps.Geocoder();
      if(maps && vm.map.control.getGMap) {
        $log.debug(vm.map.control);
        vm.map.object = vm.map.control.getGMap();
        console.log('map object', vm.map.object);
      }

      vm.sync.$loaded().then(function(data) {
        vm.mapLoaded = true;
        if(data.location) {
          vm.map = {
            center: {
              latitude: data.location.A,
              longitude: data.location.F
            },
            zoom: 13,
            options: {
              scrollwheel: false
            }
          };
          vm.map.marker = {
            coords: {
              latitude: data.location.A,
              longitude: data.location.F
            },
            options: {
              draggable: true
            },
            events: {
              dragend: function(marker, eventName, args) {
                $log.log('marker moved');
                var lat = marker.getPosition().lat();
                var lon = marker.getPosition().lng();
                console.log(marker);
                var latlng = new maps.LatLng(lat, lon);
                vm.geocoder.geocode({
                  'latLng': latlng
                }, function(results, status) {
                  if(status == maps.GeocoderStatus.OK) {
                    if(results[0]) {
                      $log.log(results);
                      syncLocation(results[0]);
                    } else {
                      alert('No results found');
                    }
                  } else {
                    alert('Geocoder failed due to: ' + status);
                  }
                });
              }
            }
          };
        }

        if(data.address) {
          vm.searchMap.text = vm.sync.address;
        }
        vm.dataLoaded = true;
      });
    });

    vm.message = 'Hello Group World';
    vm.id = $stateParams.id;

    var activate = function() {
      vm.save = save;
      vm.updateMap = syncLocation;

      vm.searchMap = {
        text: vm.sync.address || null,
        details: null,
        options: {
          watchEnter: true
        }
      };

    };
    activate();
  }

  controller.$inject = deps;
  app.controller(app.name + '.' + controllername, controller);
};

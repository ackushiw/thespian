'use strict';
 /*eslint consistent-this:[2,  "fireMapCtrl"] */
var directivename = 'fireMap';

module.exports = function(app) {

    // controller
    var controllerDeps = ['FBURL', '$firebaseObject','uiGmapGoogleMapApi'];
    var controller = function(FBURL, $firebaseObject, uiGmapGoogleMapApi) {
        var fireMapCtrl = this;
        var vm = fireMapCtrl;
        console.log(vm.map);

        fireMapCtrl.directivename = directivename;
    };
    controller.$inject = controllerDeps;

    /*eslint-disable consistent-this */

    // directive
    var directiveDeps = ['FBURL','$firebaseObject','uiGmapGoogleMapApi', '$log'];
    var directive = function(FBURL,$firebaseObject, uiGmapGoogleMapApi, $log) {
        return {
            restrict: 'AE',
            scope: {
                title: '@', // '@' reads attribute value, '=' provides 2-way binding, '&" works with functions
                id: '@',
                fireLocation: '@'
            },
            controller: controller,
            controllerAs: 'fireMapCtrl',
            bindToController: true,
            template: require('./fireMap.html'),
            compile: function(tElement, tAttrs) {
                return {
                    pre: function(scope, element, attrs) {
                      //firebase
                      var GeoFire = require('geofire');
                      var geofireRef = new Firebase(FBURL + '/z-geofire');
                      var geoFire = new GeoFire(geofireRef);
                      var ref = new Firebase(FBURL + '/'+scope.fireLocation+'/' + scope.id);
                      var sync = $firebaseObject(ref);
                      sync.$bindTo(scope, 'group').then(function () {
                        $log.log('bound');
                      });

                      function save() {
                        sync.$save();
                      }

                      function syncLocation(location) {
                        console.log('test', location);
                        sync.address = location.formatted_address;
                        sync.place_id = location.place_id;
                        sync.location = location.geometry.location;
                        sync.place_url = location.url || null;
                        sync.$save().then(function(data) {
                          console.log(data);
                          geoFire.set(scope.id, [location.geometry.location.A, location.geometry.location.F]).then(function(location) {
                            console.log('data added to geofire with location: ', location);
                          }, function(error) {
                            console.error('Error: ', error);
                          });
                          scope.map = {
                            center: {
                              latitude: sync.location.A,
                              longitude: sync.location.F
                            },
                            zoom: 13
                          };
                           scope.map.marker ={
                             coords: {
                               latitude: sync.location.A,
                               longitude: sync.location.F
                             }
                           };
                        }, function(error) {
                          $log.error('Error: ', error);
                        });
                        scope.searchMap.details = null;
                      }
                      uiGmapGoogleMapApi.then(function (maps) {

                        scope.geocoder = new maps.Geocoder();
                        if (maps && scope.map.control.getGMap) {
                          $log.debug(scope.map.control);
                          scope.map.object = scope.map.control.getGMap();
                          console.log('map object', scope.map.object);
                        }

                        sync.$loaded().then(function(data) {
                          scope.mapLoaded = true;
                          if(data.location) {
                            scope.map = {
                              center: {
                                latitude: data.location.A,
                                longitude: data.location.F
                              },
                              zoom: 13,
                              options: {
                                scrollwheel: false
                              }
                            };
                            scope.map.marker = {
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
                                  scope.geocoder.geocode({
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
                            scope.searchMap.text = sync.address;
                          }
                          scope.dataLoaded = true;
                        });
                      });

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

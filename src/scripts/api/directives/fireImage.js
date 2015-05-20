'use strict';
/*eslint consistent-this:[2,  "fireImageCtrl"] */
var directivename = 'fireImage';

module.exports = function(app) {

  // controller
  var controllerDeps = ['FBURL', '$log'];
  var controller = function(FBURL, $log) {
    var fireImageCtrl = this;
    if(!fireImageCtrl.id) {
      $log.warn('please add id attribute to reference to objects location in firebase');
    }
    if(!fireImageCtrl.location) {
      $log.warn('please set location, this will be the location in firebase and s3');
    }
    var ref = new Firebase(FBURL + '/' + fireImageCtrl.location + '/' + fireImageCtrl.id);

    function existsCallback(exists, image) {
      if(exists) {
        fireImageCtrl.url = image + '?r=' + Math.random().toString(36).substring(7);
      }
    }

    function sync() {
      ref.child('url').once('value', function(snapshot) {
        var exists = (snapshot.val() !== null);
        existsCallback(exists, snapshot.val());
      });
    }

    ref.child('uploaded').on('value', function(newSnapshot) {
      $log.log(newSnapshot);
      sync();
    });

    sync();
    fireImageCtrl.directivename = directivename;
  };
  controller.$inject = controllerDeps;

  /*eslint-disable consistent-this */

  // directive
  var directiveDeps = [];
  var directive = function() {
    return {
      restrict: 'AE',
      scope: {
        placeholder: '@', // '@' reads attribute value, '=' provides 2-way binding, '&" works with functions
        location: '@',
        id: '@'
      },
      controller: controller,
      controllerAs: 'fireImageCtrl',
      bindToController: true,
      template: require('./fireImage.html'),
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

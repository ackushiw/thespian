'use strict';
var controllername = 'pictures';

module.exports = function(app) {
  /*jshint validthis: true */

  var deps = ['FBURL', '$firebaseObject', 'ngParse'];

  function controller(FBURL, $firebaseObject, ngParse) {
    var vm = this;
    vm.message = 'Hello World';
    vm.test = function(data) {
      console.log('test', data);
    };
    var activate = function() {
      var Cat = ngParse.Object.extend('Cat', {
        fields: [
          'name',
          'colour',
          'breed'
        ]
      });

      vm.uploadHeadshot = function(file) {
        console.log('uploading');
        console.log(file);
      };

    };
    activate();
  }

  controller.$inject = deps;
  app.controller(app.name + '.' + controllername, controller);
};

'use strict';
var controllername = 'signup';

module.exports = function(app) {
  /*jshint validthis: true */

  var deps = ['main.api.parse', '$log'];

  function controller(Parse, $log) {
    var vm = this;
    vm.message = 'Hello World';
    vm.newUser = {
      name: null,
      username: null,
      password: null,
      email: null,
      role: null
    };
    vm.user = new Parse.User();

    vm.user.set('message', vm.message);

    vm.checkEmail = function(email) {
      if(email) {
        vm.user.set('email', email);
        vm.inputValid.email = true;
      }
    };
    vm.checkName = function(name) {

      if(name) {
        $log.log(vm.newUser);
        $log.log(vm.user);
        vm.user.name = name;
        vm.inputValid.name = true;
      }
    };
    vm.checkPassword = function() {
      if(vm.newUser.password) {
        vm.user.set('password', vm.newUser.password);
        vm.inputValid.password = true;
      }
    };
    vm.checkUsername = function(username) {
      if(username) {
        vm.user.set('username', username);
        vm.inputValid.username = true;
      }
    };
    vm.checkRole = function() {
      if(vm.newUser.role) {
        vm.user.set('role', vm.newUser.role);
        vm.inputValid.role = true;
      }
    };

    vm.signUp = function() {

      vm.user.signUp(null, {
        success: function(user) {
          // Hooray! Let them use the app now.
        },
        error: function(user, error) {
          // Show the error message somewhere and let the user try again.
          $log.error('Error: ' + error.code + ' ' + error.message);
        }
      });
    };

  }

  controller.$inject = deps;
  app.controller(app.name + '.' + controllername, controller);
};

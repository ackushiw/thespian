'use strict';
 /*eslint consistent-this:[2,  "fireMapCtrl"] */
var directivename = 'fireMap';

module.exports = function(app) {

    // controller
    var controllerDeps = [];
    var controller = function() {
        var fireMapCtrl = this;
        var vm = fireMapCtrl;
        vm.map = {
          center: {
            latitude: 45,
            longitude: -73
          },
          control: {},
          pan: false,
          zoom: 8
        };
        fireMapCtrl.directivename = directivename;
    };
    controller.$inject = controllerDeps;

    /*eslint-disable consistent-this */

    // directive
    var directiveDeps = [];
    var directive = function() {
        return {
            restrict: 'AE',
            scope: {
                title: '@' // '@' reads attribute value, '=' provides 2-way binding, '&" works with functions
            },
            controller: controller,
            controllerAs: 'fireMapCtrl',
            bindToController: true,
            template: require('./fireMap.html'),
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

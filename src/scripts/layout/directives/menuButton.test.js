'use strict';
/*eslint consistent-this:[0] */
var angularMock = require('angular-mocks');
var app = require('../')('app');
var directivename = 'menuButton';
var unitHelper = require('unitHelper');

describe(app.name, function() {

  describe('Directives', function() {

    describe(directivename, function() {

      beforeEach(function() {
        angularMock.mock.module(app.name);
      });

      beforeEach(inject(function($injector) {
        this.$templateCache = $injector.get('$templateCache');
        this.$compile = $injector.get('$compile');
        this.$scope = $injector.get('$rootScope').$new();
      }));

      it('should succeed', function() {
        var element = unitHelper.compileDirective.call(this, directivename, '<menu-button></menu-button>');
        expect(element.html().trim()).toBeDefined();
      });

    });
  });
});

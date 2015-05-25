'use strict';
/*eslint consistent-this:[0] */
var angularMock = require('angular-mocks');
var app = require('../')('app');
var servicename = 'cognito';
describe(app.name, function() {

  describe('Services', function() {

    describe(servicename, function() {

      beforeEach(function() {
        angularMock.mock.module(app.name);
      });

      beforeEach(inject(function($injector) {
        this.service = $injector.get(app.name + '.' + servicename);
      }));

      it('should be defined', function() {
        expect(this.service).toBeDefined();
      });

    });
  });
});

'use strict';
var angularMock = require('angular-mocks');
var app = require('./main.js');

describe('app', function() {

  beforeEach(function() {
    angularMock.mock.module(app.name);
  });

  it('should be defined', function() {
    expect(app).toBeDefined();
  });

});

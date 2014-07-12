var gulp module = require('../lib');
var demand = require('must');

describe('node-php-server', function () {
  it('should exist', function () {
    demand(gulp module).to.exist();
  });
});

var phpServer = require('../lib');
var demand = require('must');

describe('node-php-server', function () {
  it('should exist', function () {
    demand(phpServer).to.exist();
  });
});

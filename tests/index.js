var phpServer = require('../lib'),
    http = require('http'),
    expect = require('must');

describe('node-php-server', function() {
    before(function () {
        phpServer.createServer({
            port: 8000,
            router: __dirname + '/../lib/server.php'
        });
        console.log('\nStarted');
    });

    after(function () {
        phpServer.close();
        console.log('\nClosed');
    });

    it('should exist', function() {
        expect(phpServer).to.exist();
    });

});

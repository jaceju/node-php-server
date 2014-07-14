var phpServer = require('../lib'),
    http = require('http'),
    sleep = require('sleep'),
    expect = require('must');

describe('node-php-server', function() {

    before(function () {
        phpServer.createServer({
            port: 8000,
            base: __dirname + '/../examples/',
            router: __dirname + '/../examples/server.php'
        });
        sleep.sleep(1);
    });

    after(function () {
        phpServer.close();
    });

    describe('fetch data', function() {

        it('should exist', function() {
            expect(phpServer).to.exist();
        });

        it('should return 200', function(done) {
            http.get('http://127.0.0.1:8000/css/style.css', function(res) {
                var data = '';
                res.on('data', function(chunk) {
                    data += chunk;
                });

                res.on('end', function() {
                    expect(data).to.equal('@charset \'utf-8\';');
                    expect(res.statusCode).to.equal(200);
                    done();
                });
            });
        });

    });
});


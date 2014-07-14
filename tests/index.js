var phpServer = require('../lib'),
    http = require('http'),
    expect = require('must');

describe('node-php-server', function() {
    before(function () {
        phpServer.createServer({
            port: 8000,
            router: __dirname + '/../examples/server.php'
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

    // it('should return 200', function(done) {
    //     console.log('Opening...');
    //     http.get('http://127.0.0.1:8000/', function(res) {
    //         console.log('Checking...');
    //         // expect(res.statusCode).to.equal(200);
    //         assert.equal(200, res.statusCode);
    //         done();
    //     });
    // });
});

// var instance;

// describe('Tests', function() {

//     before(function() {
//         instance = http.createServer(function(request, response) {
//             console.log(request.url);
//         }).listen(8000);
//         instance.on("listening", function() {
//             console.log("Started");
//         });
//     });

//     after(function(done) {
//         instance.close();
//         console.log("Stopped");
//         done();
//     });

//     it("Should fetch test.html", function(done) {
//         console.log("Fetching URL...");
//         http.get({
//             host: "localhost",
//             port:8000,
//             path: "/"
//         }, function(res) {
//             console.log('OK');
//             expect(res.statusCode).toEqual(200);
//             done();
//         })
//     });

// });

// describe('server', function() {
//     var server;

//     before(function() {
//         server = http.createServer()
//             .listen(8000)
//             .on('listening', function() {
//                 console.log('Started connect web server on http://localhost:8000');
//             });
//     });

//     after(function() {
//         server.close(function () {
//             console.log('Closing...');
//         });
//     });
// });

// describe('/', function() {
//     it('should return 200', function(done) {
//         http.get('http://localhost:8000', function(res) {
//             expect(res.statusCode).to.equal(200);
//             done();
//         });
//     });
// });

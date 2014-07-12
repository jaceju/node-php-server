/**
 * Variables
 */
var path = require('path'),
    http = require('http'),
    spawn = require('child_process').spawn
    checkServerTries = 0;

/**
 * @param object target
 * @return object
 */
function extend(target) {
    var sources = [].slice.call(arguments, 1);
    sources.forEach(function (source) {
        for (var prop in source) {
            target[prop] = source[prop];
        }
    });
    return target;
}

/**
 * Check server status
 * @param string hostname
 * @param integer port
 * @param Function cb
 */
function checkServer(hostname, port, cb) {

    // Check server status by http module.
    setTimeout(function () {
        http.request({
            method: 'HEAD',
            hostname: hostname,
            port: port
        }, function (res) {
            if (res.statusCode === 200 || res.statusCode === 404) {
                return cb();
            }
            checkServer(hostname, port, cb);
        }).on('error', function (err) {
            // back off after 1s
            if (++checkServerTries > 20) {
                return cb();
            }
            checkServer(hostname, port, cb);
        }).end();
    }, 50);
}

/**
 * @param object parmas
 */
module.exports = function (params) {
    'use strict';

    // Default options
    var defaults = {
        port: 8000,
        router: 'server.php',
        hostname: '127.0.0.1',
        base: '.',
        keepalive: false,
        open: false,
        bin: 'php'
    };

    // Set arguments for command from options
    var options = extend({}, defaults, params);
    var host = options.hostname + ':' + options.port;
    var args = ['-S', host];

    if (options.router) {
        args.push(options.router);
    }

    // Execute command
    var cp = spawn(options.bin, args, {
        cwd: path.resolve(options.base),
        stdio: 'inherit'
    });

    // Kill command process when exits.
    process.on('exit', function () {
        cp.kill();
    });
};

var NodePhpServer = function () {

    /**
     * Variables
     */
    var path = require('path'),
        http = require('http'),
        open = require('open'),
        spawn = require('child_process').spawn,
        cp = null,
        checkServerTries = 0;

    /**
     * @param object target
     * @return object
     */
    var extend = function (target) {
        var sources = [].slice.call(arguments, 1);
        sources.forEach(function (source) {
            for (var prop in source) {
                target[prop] = source[prop];
            }
        });
        return target;
    };

    /**
     * Check server status by http module
     * @param string hostname
     * @param integer port
     * @param Function cb
     */
    var checkServer = function (hostname, port, cb) {
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
                    console.log(err);
                    return cb();
                }
                checkServer(hostname, port, cb);
            }).end();
        }, 50);
    };

    /**
     * @param object parmas
     */
    var createServer = function (params) {
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

        // Check when the server is ready. tried doing it by listening
        // to the child process `data` event, but it's not triggered...
        checkServer(options.hostname, options.port, function () {
            if (!options.keepalive) {
                return;
            }

            if (options.open) {
                open('http://' + host);
            }
        }.bind(this));

        // Execute command
        cp = spawn(options.bin, args, {
            cwd: path.resolve(options.base),
            stdio: 'ignore'
        });

        // Kill command process when exits.
        process.on('exit', function () {
            cp.kill();
        });
    };

    var close = function () {
        cp.kill();
    };

    return {
        checkServer: checkServer,
        createServer: createServer,
        close: close
    };
};

module.exports = new NodePhpServer();
# node-php-server [![Build Status](https://travis-ci.org/jaceju/node-php-server.svg?branch=master)](https://travis-ci.org/jaceju/node-php-server)

Create a built-in PHP server for node.js.

## Install

```bash
npm install --save node-php-server
```

## Examples

```js
var phpServer require('node-php-server');

// Create a PHP Server
phpServer.createServer({
    port: 8000,
    hostname: '127.0.0.1',
    base: '.',
    keepalive: false,
    open: false,
    bin: 'php',
    router: __dirname + '/../lib/server.php'
});

// Close server
phpServer.close();
```

## License

MIT

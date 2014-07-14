# node-php-server [![Build Status](https://travis-ci.org/jaceju/node-php-server.svg?branch=master)](https://travis-ci.org/jaceju/node-php-server)

Create a built-in PHP server for PHP framework in node.js script.

## Install

```bash
npm install --save node-php-server
```

## Examples

```js
var phpServer = require('node-php-server');

// Create a PHP Server
phpServer.createServer({
    port: 8000,
    hostname: '127.0.0.1',
    base: '.',
    keepalive: false,
    open: false,
    bin: 'php',
    router: __dirname + '/server.php'
});

// Close server
phpServer.close();
```

`server.php`

```php
<?php
// Example from Laravel framework
return call_user_func(function () {
    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $publicDir = __DIR__ . '/public';
    $uri = urldecode($uri);

    $requested = $publicDir . '/' . $uri;

    if ($uri !== '/' && file_exists($requested)) {
        return false;
    }

    require_once $publicDir . '/index.php';
});
```

## License

MIT

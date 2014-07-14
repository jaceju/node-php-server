<?php

return call_user_func(function () {
    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $publicDir = __DIR__;
    $uri = urldecode($uri);
    $requested = $publicDir . '/' . $uri;

    if ($uri !== '/' && file_exists($requested)) {
        return false;
    }

    require_once $publicDir . '/index.php';
});

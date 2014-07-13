<?php

call_user_func(function () {
    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $publicDirs = [
        __DIR__ . '/../.tmp/',
        __DIR__ . '/../examples/',
    ];
    $uri = urldecode($uri);

    foreach ($publicDirs as $publicDir) {
        $requested = $publicDir . $uri;

        if ($uri !== '/' && file_exists($requested)) {
            return false;
        }
    }

    require_once $publicDirs[1] . 'index.php';
});

<?php

/**
 * This file has been auto-generated
 * by the Symfony Routing Component.
 */

return [
    false, // $matchHost
    [ // $staticRoutes
        '/api/login_check' => [[['_route' => 'api_login_check', '_controller' => 'App\\Infrastructure\\UI\\HTTP\\Web\\v1\\Endpoint\\User\\Login::getTokenUser'], null, ['POST' => 0], null, false, false, null]],
        '/register' => [[['_route' => 'register', '_controller' => 'App\\Infrastructure\\UI\\HTTP\\Web\\v1\\Endpoint\\User\\Login::register'], null, null, null, false, false, null]],
        '/api/test' => [[['_route' => 'test', '_controller' => 'App\\Infrastructure\\UI\\HTTP\\Web\\v1\\Endpoint\\User\\Login::test'], null, null, null, false, false, null]],
    ],
    [ // $regexpList
        0 => '{^(?'
                .'|/_error/(\\d+)(?:\\.([^/]++))?(*:35)'
            .')/?$}sDu',
    ],
    [ // $dynamicRoutes
        35 => [
            [['_route' => '_preview_error', '_controller' => 'error_controller::preview', '_format' => 'html'], ['code', '_format'], null, null, false, true, null],
            [null, null, null, null, false, false, 0],
        ],
    ],
    null, // $checkCondition
];

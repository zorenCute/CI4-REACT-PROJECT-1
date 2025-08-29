<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->group('api', function($routes) {
    $routes->get('projects', 'Api\Projects::index');
    $routes->post('auth/login', 'Api\Auth::login');

    // Maintenance routes
    $routes->get('maintenance/status', 'Api\Maintenance::status');
    $routes->post('maintenance/toggle', 'Api\Maintenance::toggle');
});

// Catch-all OPTIONS route for CORS preflight
$routes->options('api/(:any)', function($path){
    return service('response')->setStatusCode(200);
});

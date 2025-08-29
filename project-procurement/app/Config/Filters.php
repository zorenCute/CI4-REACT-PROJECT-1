<?php

namespace Config;

use CodeIgniter\Config\BaseConfig;

class Filters extends BaseConfig
{
    public array $aliases = [
        'csrf'    => \CodeIgniter\Filters\CSRF::class,
        'toolbar' => \CodeIgniter\Filters\DebugToolbar::class,
        'honeypot'=> \CodeIgniter\Filters\Honeypot::class,
        'cors'    => \App\Filters\Cors::class,
    ];

    public array $required = [];

   public array $globals = [
    'before' => ['cors'], // ensures preflight and API calls always get CORS headers
    'after'  => [],
];

public array $filters = [
    // you can keep this if you want fine-grained control
    'cors' => ['before' => ['api/*']],
];

}

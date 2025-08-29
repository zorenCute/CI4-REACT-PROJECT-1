<?php

namespace Config;

use CodeIgniter\Database\Config;

class Database extends Config
{

 public string $defaultGroup = 'default'; // Add this line
    /**
     * The directory that holds the Migrations and Seeds directories.
     */
    public string $filesPath = APPPATH . 'Database' . DIRECTORY_SEPARATOR;

    /**
     * The default database connection settings.
     * Initialized in the constructor.
     */
    public array $default = [];

    /**
     * Database connection settings for PHPUnit tests.
     */
    public array $tests = [
        'DSN'         => '',
        'hostname'    => '127.0.0.1',
        'username'    => '',
        'password'    => '',
        'database'    => ':memory:',
        'DBDriver'    => 'SQLite3',
        'DBPrefix'    => 'db_',
        'pConnect'    => false,
        'DBDebug'     => true,
        'charset'     => 'utf8',
        'DBCollat'    => '',
        'swapPre'     => '',
        'encrypt'     => false,
        'compress'    => false,
        'strictOn'    => false,
        'failover'    => [],
        'port'        => 3306,
        'foreignKeys' => true,
        'busyTimeout' => 1000,
        'dateFormat'  => [
            'date'     => 'Y-m-d',
            'datetime' => 'Y-m-d H:i:s',
            'time'     => 'H:i:s',
        ],
    ];

    public function __construct()
    {
        parent::__construct();
        
        $this->default = [
            'DSN'      => '',
            'hostname' => env('database.default.hostname', 'localhost'),
            'username' => env('database.default.username', 'root'),
            'password' => env('database.default.password', ''),
            'database' => env('database.default.database', 'dbreact'),
            'DBDriver' => 'MySQLi',
            'DBPrefix' => '',
            'port'     => (int) env('database.default.port', 3306), // Cast to integer
            'DBDebug'  => (ENVIRONMENT !== 'production'),
            'charset'  => 'utf8mb4',
            'DBCollat' => 'utf8mb4_general_ci',
            'swapPre'  => '',
            'encrypt'  => false,
            'compress' => false,
            'strictOn' => false,
            'failover' => [],
            'dateFormat' => [
                'date'     => 'Y-m-d',
                'datetime' => 'Y-m-d H:i:s',
                'time'     => 'H:i:s',
            ]
        ];

        if (ENVIRONMENT === 'testing') {
            $this->defaultGroup = 'tests';
        }
    }
}
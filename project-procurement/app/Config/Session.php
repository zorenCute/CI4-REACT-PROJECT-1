<?php

namespace Config;

use CodeIgniter\Config\BaseConfig;
use CodeIgniter\Session\Handlers\FileHandler;
use CodeIgniter\Session\Handlers\DatabaseHandler;
use CodeIgniter\Session\Handlers\RedisHandler;

class Session extends BaseConfig
{
    public string $driver = FileHandler::class;
    public string $cookieName = 'ci_session';
    public int $expiration = 7200;
    public string $savePath = WRITEPATH . 'session';
    public bool $matchIP = false;
    public int $timeToUpdate = 300;
    public bool $regenerateDestroy = false;
    public ?string $DBGroup = null;
    public int $lockRetryInterval = 100_000;
    public int $lockMaxRetries = 300;

    // Additional security settings
    public bool $cookieSecure = false;
    public string $cookieSameSite = 'Lax';
    public bool $httpOnly = true;

    public function __construct()
    {
        parent::__construct();

        // Load environment configurations
        $this->configureFromEnvironment();
        $this->configureForProduction();
    }

    protected function configureFromEnvironment(): void
    {
        $this->driver = env('session.driver', $this->driver);
        $this->cookieName = env('session.cookieName', $this->cookieName);
        $this->expiration = (int) env('session.expiration', $this->expiration);
        $this->matchIP = (bool) env('session.matchIP', $this->matchIP);
        $this->timeToUpdate = (int) env('session.timeToUpdate', $this->timeToUpdate);
        $this->cookieSecure = (bool) env('session.cookieSecure', $this->cookieSecure);
        $this->cookieSameSite = env('session.cookieSameSite', $this->cookieSameSite);
        
        // Driver-specific configurations
        $this->configureDriverSettings();
    }

    protected function configureDriverSettings(): void
    {
        switch ($this->driver) {
            case DatabaseHandler::class:
                $this->savePath = env('session.tableName', 'ci_sessions');
                $this->DBGroup = env('session.DBGroup');
                break;
                
            case RedisHandler::class:
                $this->savePath = env('session.redisSavePath', 'tcp://127.0.0.1:6379');
                $this->lockRetryInterval = (int) env('session.lockRetryInterval', $this->lockRetryInterval);
                $this->lockMaxRetries = (int) env('session.lockMaxRetries', $this->lockMaxRetries);
                break;
                
            default: // FileHandler
                $this->savePath = env('session.fileSavePath', WRITEPATH . 'session');
        }
    }

    protected function configureForProduction(): void
    {
        if (ENVIRONMENT === 'production') {
            $this->matchIP = true;
            $this->cookieSecure = true;
            $this->httpOnly = true;
            $this->cookieSameSite = 'Strict';
            $this->regenerateDestroy = true;
            
            // Default to database driver in production
            if ($this->driver === FileHandler::class) {
                $this->driver = DatabaseHandler::class;
                $this->savePath = 'ci_sessions';
            }
        }
    }

    /**
     * Get session configuration summary
     */
    public function getConfigSummary(): array
    {
        return [
            'driver' => $this->driver,
            'cookieName' => $this->cookieName,
            'expiration' => $this->expiration,
            'security' => [
                'matchIP' => $this->matchIP,
                'cookieSecure' => $this->cookieSecure,
                'sameSite' => $this->cookieSameSite
            ],
            'environment' => ENVIRONMENT
        ];
    }
}
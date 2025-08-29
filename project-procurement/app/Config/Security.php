<?php

namespace Config;

use CodeIgniter\Config\BaseConfig;

class Security extends BaseConfig
{
    /**
     * CSRF Protection Configuration
     */
    public string $csrfProtection = 'session'; // 'cookie' or 'session'
    public bool $tokenRandomize = true;
    public string $tokenName = 'csrf_test_name';
    public string $headerName = 'X-CSRF-TOKEN';
    public string $cookieName = 'csrf_cookie_name';
    public int $expires = 7200; // 2 hours in seconds
    public bool $regenerate = true;
    public bool $redirect = false;

    /**
     * HSTS Header Configuration (Strict-Transport-Security)
     */
    public bool $hstsEnabled = false;
    public int $hstsMaxAge = 31536000; // 1 year
    public bool $hstsIncludeSubdomains = true;
    public bool $hstsPreload = false;

    /**
     * Content Security Policy Headers
     */
    public bool $cspEnabled = false;

    public function __construct()
    {
        parent::__construct();

        // Environment-specific overrides
        $this->configureForEnvironment();
    }

    protected function configureForEnvironment(): void
    {
        if (ENVIRONMENT === 'production') {
            $this->redirect = true;
            $this->hstsEnabled = true;
            $this->cspEnabled = true;
            
            // Stronger cookie settings for production
            $this->cookieName = '__Host-csrf_token';
            $this->expires = 86400; // 24 hours
        }
    }

    /**
     * Get security headers configuration
     */
    public function headers(): array
    {
        $headers = [];

        if ($this->hstsEnabled) {
            $hstsValue = "max-age={$this->hstsMaxAge}";
            $hstsValue .= $this->hstsIncludeSubdomains ? '; includeSubDomains' : '';
            $hstsValue .= $this->hstsPreload ? '; preload' : '';
            
            $headers['Strict-Transport-Security'] = $hstsValue;
        }

        if ($this->cspEnabled) {
            $headers['Content-Security-Policy'] = "default-src 'self'";
        }

        return $headers;
    }
}
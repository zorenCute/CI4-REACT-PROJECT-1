<?php

namespace Config;

use CodeIgniter\Config\BaseConfig;

class App extends BaseConfig
{
    // Base Configuration
    public string $baseURL = 'http://localhost:8080';
    public array $allowedHostnames = [];
    public string $indexPage = '';
    public string $uriProtocol = 'REQUEST_URI';
    public string $permittedURIChars = 'a-z 0-9~%.:_\-';

    // Internationalization
    public string $defaultLocale = 'en';
    public bool $negotiateLocale = false;
    public array $supportedLocales = ['en'];
    public string $appTimezone = 'UTC';
    public string $charset = 'UTF-8';

    // Security
    public bool $forceGlobalSecureRequests = false;
    public array $proxyIPs = [];
    public bool $CSPEnabled = false;

    // Debug
    public bool $debug = false;
    public bool $logAllRequests = false;

    public function __construct()
    {
        parent::__construct();

        // Load environment configurations
        $this->loadEnvironmentSettings();
        $this->configureForEnvironment();
    }

    protected function loadEnvironmentSettings(): void
    {
        // URL and Protocol
        $this->baseURL = rtrim(env('app.baseURL', $this->baseURL), '/').'/';
        $this->forceGlobalSecureRequests = (bool) env('app.forceGlobalSecureRequests', $this->forceGlobalSecureRequests);
        
        // Internationalization
        $this->appTimezone = env('app.timezone', $this->appTimezone);
        $this->defaultLocale = env('app.locale', $this->defaultLocale);
        
        // Security
        $this->CSPEnabled = (bool) env('app.CSPEnabled', $this->CSPEnabled);
        
        // Debug
        $this->debug = (bool) env('app.debug', $this->debug);
        $this->logAllRequests = (bool) env('app.logAllRequests', $this->logAllRequests);

        // Array configurations
        $this->loadArrayConfigurations();
    }

    protected function configureForEnvironment(): void
    {
        if (ENVIRONMENT === 'production') {
            $this->forceGlobalSecureRequests = true;
            $this->CSPEnabled = true;
            
            // Ensure production URLs use HTTPS
            if (strpos($this->baseURL, 'http://') === 0) {
                $this->baseURL = str_replace('http://', 'https://', $this->baseURL);
            }
        }
    }

    protected function loadArrayConfigurations(): void
    {
        // Allowed hostnames
        if ($hostnames = env('app.allowedHostnames')) {
            $this->allowedHostnames = array_filter(
                explode(',', $hostnames),
                fn($item) => !empty(trim($item))
            );
        }

        // Supported locales
        if ($locales = env('app.supportedLocales')) {
            $this->supportedLocales = array_filter(
                explode(',', $locales),
                fn($item) => !empty(trim($item))
            );
        }

        // Proxy IPs
        if ($proxyIPs = env('app.proxyIPs')) {
            $this->proxyIPs = array_filter(
                explode(',', $proxyIPs),
                fn($item) => !empty(trim($item))
            );
        }
    }

    /**
     * Get current environment configuration summary
     */
    public function getConfigSummary(): array
    {
        return [
            'environment' => ENVIRONMENT,
            'baseURL' => $this->baseURL,
            'timezone' => $this->appTimezone,
            'debug' => $this->debug,
            'security' => [
                'https' => $this->forceGlobalSecureRequests,
                'csp' => $this->CSPEnabled,
                'proxyIPs' => !empty($this->proxyIPs)
            ]
        ];
    }
}
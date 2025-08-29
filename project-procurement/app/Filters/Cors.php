<?php

namespace App\Filters;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Filters\FilterInterface;
use Config\Services;

class Cors implements FilterInterface
{
    private array $allowedHeaders = [
        'Content-Type',
        'Authorization',
        'X-Requested-With'
    ];

    private array $allowedMethods = [
        'GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'
    ];

    public function before(RequestInterface $request, $arguments = null)
    {
        $response = Services::response();
        $origin = rtrim(strtolower($request->getHeaderLine('Origin')), '/');

        // Determine allowed origin
        $allowOrigin = $this->isOriginAllowed($origin) ? $origin : null;

        if ($allowOrigin) {
            $response->setHeader('Access-Control-Allow-Origin', $allowOrigin)
                     ->setHeader('Vary', 'Origin')
                     ->setHeader('Access-Control-Allow-Credentials', 'true');
        }

        $response->setHeader('Access-Control-Allow-Methods', implode(', ', $this->allowedMethods));
        $response->setHeader('Access-Control-Allow-Headers', implode(', ', $this->allowedHeaders));
        $response->setHeader('Access-Control-Max-Age', '86400');

        // Handle preflight OPTIONS request
        if ($request->getMethod(true) === 'OPTIONS') {
            return $response->setStatusCode(200); // just return response, don't send()
        }

        return null;
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        $origin = rtrim(strtolower($request->getHeaderLine('Origin')), '/');
        $allowOrigin = $this->isOriginAllowed($origin) ? $origin : null;

        if ($allowOrigin && ! $response->hasHeader('Access-Control-Allow-Origin')) {
            $response->setHeader('Access-Control-Allow-Origin', $allowOrigin)
                     ->setHeader('Vary', 'Origin')
                     ->setHeader('Access-Control-Allow-Credentials', 'true');
        }

        if (! $response->hasHeader('Access-Control-Allow-Methods')) {
            $response->setHeader('Access-Control-Allow-Methods', implode(', ', $this->allowedMethods));
        }

        if (! $response->hasHeader('Access-Control-Allow-Headers')) {
            $response->setHeader('Access-Control-Allow-Headers', implode(', ', $this->allowedHeaders));
        }

        return $response;
    }

    private function isOriginAllowed(string $origin): bool
    {
        $origin = rtrim($origin, '/');

        if (ENVIRONMENT === 'production') {
            $host = strtolower(parse_url($origin, PHP_URL_HOST) ?? '');
            return $host === 'ndtcalumni.com' || str_ends_with($host, '.ndtcalumni.com');
        }

        // Development whitelist
        return in_array($origin, array_map(fn($o) => rtrim($o, '/'), $this->getDevelopmentOrigins()), true);
    }

    private function getDevelopmentOrigins(): array
    {
        return [
            'http://localhost:5173',
            'http://localhost:5174',
            'http://localhost:3000',
            'http://127.0.0.1:5173',
            'http://[::1]:5173',
        ];
    }
}

<?php

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

function createJWT($payload) {
    $key = getenv('JWT_SECRET');
    $issuedAt = time();
    $expirationTime = $issuedAt + 3600; // valid for 1 hour
    $payload['iat'] = $issuedAt;
    $payload['exp'] = $expirationTime;

    return JWT::encode($payload, $key, 'HS256');
}

function decodeJWT($jwt) {
    $key = getenv('JWT_SECRET');
    return JWT::decode($jwt, new Key($key, 'HS256'));
}

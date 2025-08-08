<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use App\Models\UserModel;
use \Firebase\JWT\JWT;
class Auth extends BaseController
{
   public function login()
{

     helper('jwt');
    $data = $this->request->getJSON();

    $usernamex = $data->username ?? '';
    $password = $data->password ?? '';

    if (!$usernamex || !$password) {
        return $this->response->setJSON(['error' => 'Missing credentials'])->setStatusCode(400);
    }

    $userModel = new UserModel();
    $user = $userModel->where('sysusername', $usernamex)->first();




    if (!$user || !password_verify($password, $user['syspassword'])) {
        return $this->response->setJSON(['error' => 'Invalid username or password'])->setStatusCode(401);
    }

    // Create the JWT payload
    $payload = [
        'iss' => 'localhost',
        'aud' => 'localhost',
        'iat' => time(),
        'exp' => time() + 3600,
        'sub' => $user['id'],
        'username' => $user['sysusername'],
        'role' => $user['sysrole'],
        'name' => $user['name'],
         'id' => $user['id'],
    ];

    // Use your helper function instead of inline JWT logic
    $jwt = createJWT($payload); // <- this comes from your helper

    return $this->response->setJSON([
        'token' => $jwt,
        'user' => [
            'id' => $user['id'],
            'name' => $user['name'],
            'role' => $user['sysrole'],
            'username' => $user['sysusername'] ?? null,
        ]
    ]);
}

}

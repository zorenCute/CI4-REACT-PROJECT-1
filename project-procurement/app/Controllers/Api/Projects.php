<?php

namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;

class Projects extends ResourceController
{
    public function index()
    {
        // Just a dummy example
        return $this->respond([
            ['id' => 1, 'name' => 'Procurement System'],
            ['id' => 2, 'name' => 'Library System']
        ]);
    }
}

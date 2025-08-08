<?php
// app/Database/Seeders/UserSeeder.php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run()
    {
        $data = [
            [
                'name' => 'Admin User',
                'sysusername' => 'admin123',
                 'syspassword' => password_hash('admin123', PASSWORD_DEFAULT),
                'sysrole' => 'ADMIN',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'name' => 'Regular User',
                'sysusername' => 'user123',
                'syspassword' => password_hash('user123', PASSWORD_DEFAULT),
                 'sysrole' => 'USER',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ]
        ];

        $this->db->table('tblusers')->insertBatch($data);
    }
}
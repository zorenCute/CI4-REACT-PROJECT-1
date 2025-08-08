<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class MaintenanceSeeder extends Seeder
{
    public function run()
    {
        $data = [
            'message' => 'Scheduled system maintenance',
            'is_active' => 0,
            'start_time' => null,
            'end_time' => null
        ];

        $this->db->table('tblmaintenance')->insert($data);
    }
}
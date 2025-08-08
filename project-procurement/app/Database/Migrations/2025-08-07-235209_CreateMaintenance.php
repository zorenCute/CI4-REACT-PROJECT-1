<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateMaintenance extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'maintenanceid' => [
                'type'           => 'BIGINT',
                'unsigned'       => true,
                'auto_increment' => true,
            ],
            'message' => [
                'type'       => 'VARCHAR',
                'constraint' => '255', // Increased length for longer messages
                'null'       => true,
            ],
            'is_active' => [
                'type'       => 'TINYINT',
                'constraint' => 1,
                'default'    => 0,
            ],
            'start_time' => [
                'type'       => 'DATETIME',
                'null'       => true,
            ],
            'end_time' => [
                'type'       => 'DATETIME',
                'null'       => true,
            ],
            'created_at' => [
                'type'       => 'DATETIME',
                'null'       => true,
            ],
            'updated_at' => [
                'type'       => 'DATETIME',
                'null'       => true,
            ]
        ]);

        $this->forge->addKey('maintenanceid', true);
        $this->forge->createTable('tblmaintenance');
    }

    public function down()
    {
        $this->forge->dropTable('tblmaintenance');
    }
}
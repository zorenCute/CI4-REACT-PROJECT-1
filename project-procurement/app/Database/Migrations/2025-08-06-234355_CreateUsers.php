<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateUsers extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id'         => [
                'type'           => 'BIGINT',
                'unsigned'       => true,
                'auto_increment' => true,
            ],
            'name'       => [
                'type'       => 'VARCHAR',
                'constraint' => '100',
            ],
            'sysusername'      => [
                'type'       => 'VARCHAR',
                'constraint' => '150',
                
            ],
            'syspassword'   => [
                'type'       => 'VARCHAR',
                'constraint' => '255',
            ],
              'sysrole'      => [
                'type'       => 'VARCHAR',
                'constraint' => '30',
              
            ],
            'created_at' => [
                'type'       => 'DATETIME',
                'null'       => true,
            ],
            'updated_at' => [
                'type'       => 'DATETIME',
                'null'       => true,
            ],
        ]);

        $this->forge->addKey('id', true); // Primary key
        $this->forge->createTable('tblUsers');
    }

    public function down()
    {
        $this->forge->dropTable('tblUsers');
    }
}

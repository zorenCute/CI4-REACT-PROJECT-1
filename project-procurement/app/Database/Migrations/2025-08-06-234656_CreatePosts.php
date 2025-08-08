<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreatePosts extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id' => [
                'type'           => 'BIGINT',
                'unsigned'       => true,
                'auto_increment' => true,
            ],
            'user_id' => [
                'type'       => 'BIGINT',
                'unsigned'   => true,
            ],
            'title' => [
                'type' => 'TEXT',
                'null' => false,
            ],
            'body' => [
                'type'       => 'VARCHAR',
                'constraint' => 255,
                'null'       => true,
            ],
            'created_at' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
            'updated_at' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
        ]);

        $this->forge->addKey('id', true); // Primary key
        $this->forge->addForeignKey('user_id', 'tblUsers', 'id', 'CASCADE', 'CASCADE');

        $this->forge->createTable('tblPosts', true);
    }

    public function down()
    {
        $this->forge->dropTable('tblPosts', true);
    }
}

<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class PostsSeeder extends Seeder
{
 public function run()
    {
        $data = [
            [
                'user_id' => 3,
                'title'   => 'First Post',
                'body'    => 'This is the body of the first post.',
            ],
            [
                'user_id' => 4,
                'title'   => 'Hello from Admin',
                'body'    => 'Admin created this post as a test.',
            ],
        ];

        $this->db->table('tblposts')->insertBatch($data);
    }
}

<?php

namespace App\Models;

use CodeIgniter\Model;

class UserModel extends Model
{
    protected $table = 'tblUsers';
    protected $primaryKey = 'id';
    protected $allowedFields = ['name', 'sysusername', 'syspassword', 'sysrole'];
    protected $useTimestamps = true;
}

<?php

namespace App\Models;

use CodeIgniter\Model;

class MaintenanceModel extends Model
{
    protected $table      = 'tblmaintenance';
    protected $primaryKey = 'maintenanceid';

    protected $allowedFields = ['message', 'is_active', 'start_time', 'end_time'];

    protected $useTimestamps = true;
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';

    public function getActiveMaintenance()
    {
        return $this->where('is_active', 1)
                    ->orderBy('maintenanceid', 'DESC')
                    ->first();
    }

    public function setMaintenance(bool $status, string $message = null, string $endTime = null)
    {
        // Deactivate all other maintenance records
        $this->where('is_active', 1)->set(['is_active' => 0])->update();

        if ($status) {
            return $this->insert([
                'message' => $message,
                'is_active' => 1,
                'start_time' => date('Y-m-d H:i:s'),
                'end_time' => $endTime
            ]);
        }
        
        return true;
    }
}
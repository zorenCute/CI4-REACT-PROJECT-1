<?php

namespace App\Controllers\Api;

use CodeIgniter\API\ResponseTrait;
use App\Models\MaintenanceModel;
use App\Controllers\BaseController;
class Maintenance extends BaseController
{
    use ResponseTrait;

    public function status()
    {
        $model = new MaintenanceModel();
        $maintenance = $model->getActiveMaintenance();

        return $this->respond([
            'isMaintenance' => $maintenance ? true : false,
            'message' => $maintenance ? $maintenance['message'] : null,
            'estimatedEnd' => $maintenance ? $maintenance['end_time'] : null
        ]);
    }

    public function toggle()
    {
        // Only allow admin access
        if (!auth()->user() || !auth()->user()->inGroup('ADMIN')) {
            return $this->failUnauthorized();
        }

        $model = new MaintenanceModel();
        $request = $this->request->getJSON();

        $success = $model->setMaintenance(
            $request->status,
            $request->message ?? null,
            $request->end_time ?? null
        );

        if ($success) {
            return $this->respond([
                'status' => $request->status,
                'message' => $request->status ? 'Maintenance mode activated' : 'Maintenance mode deactivated'
            ]);
        }

        return $this->failServerError('Failed to update maintenance status');
    }
}
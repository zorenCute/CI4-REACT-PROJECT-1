<?php

namespace Config;

use CodeIgniter\Config\BaseService;
use App\Libraries\RaffleWebSocketHandler;
/**
 * Services Configuration file.
 *
 * Services are simply other classes/libraries that the system uses
 * to do its job. This is used by CodeIgniter to allow the core of the
 * framework to be swapped out easily without affecting the usage within
 * the rest of your application.
 *
 * This file holds any application-specific services, or service overrides
 * that you might need. An example has been included with the general
 * method format you should use for your service methods. For more examples,
 * see the core Services file at system/Config/Services.php.
 */
class Services extends BaseService
{

public static function pusher($getShared = true)
{
    if ($getShared) {
        return static::getSharedInstance('pusher');
    }

    $options = [
        'cluster' => env('PUSHER_CLUSTER'), // Changed from PUSHER_APP_CLUSTER
        'useTLS' => true
    ];

    return new \Pusher\Pusher(
        env('PUSHER_KEY'),       // Changed from PUSHER_APP_KEY
        env('PUSHER_SECRET'),
        env('PUSHER_APP_ID'),
        $options
    );
} /*
     * public static function example($getShared = true)
     * {
     *     if ($getShared) {
     *         return static::getSharedInstance('example');
     *     }
     *
     *     return new \CodeIgniter\Example();
     * }
     */
}

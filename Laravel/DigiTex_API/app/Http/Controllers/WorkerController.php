<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Worker;

class WorkerController extends Controller
{
    public function show($mtc)
    {
        $worker = Worker::where('mtc', $mtc)->first();

        if (!$worker) {
            return response()->json(['error' => 'Worker not found'], 404);
        }

        return response()->json([
            'mtc' => $worker->mtc,
            'full_name' => $worker->full_name,
            'quantity_today' => $worker->quantity_today,
            'quantity_current_hour' => $worker->quantity_current_hour,
            'n_paquet' => $worker->n_paquet,
            'operation' => $worker->operation,
            'temps_unitaire' => $worker->temps_unitaire,
            'target_quantity_today' => $worker->target_quantity_today, // ✅
        ]);
    }
}

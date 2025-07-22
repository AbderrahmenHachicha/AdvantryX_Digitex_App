<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Worker extends Model
{
    protected $fillable = [
        'mtc',
        'full_name',
        'quantity_today',
        'quantity_current_hour',
        'n_paquet',
        'operation',
        'temps_unitaire',
        'target_quantity_today',
    ];
}

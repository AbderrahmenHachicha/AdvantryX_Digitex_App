<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WorkerController;

Route::get('/worker/{mtc}', [WorkerController::class, 'show']);


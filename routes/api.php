<?php

use App\Http\Controllers\NodeController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('/nodes', [NodeController::class, 'index']);
Route::post('/nodes', [NodeController::class, 'store']);
Route::get('/nodes/{node}', [NodeController::class, 'show']);
Route::patch('/nodes/{node}', [NodeController::class, 'update']);
Route::delete('/nodes/{node}', [NodeController::class, 'destroy']);

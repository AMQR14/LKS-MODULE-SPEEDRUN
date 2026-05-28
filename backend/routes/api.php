<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ConsumableController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\LevelController;
use App\Http\Controllers\LevelFeatureController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    Route::apiResource('/user', UserController::class);
    Route::apiResource('/level', LevelController::class);
    Route::apiResource('/level_feature', LevelFeatureController::class);
    Route::apiResource('/order', OrderController::class);
    Route::apiResource('/room', RoomController::class);
    Route::apiResource('/inventory', InventoryController::class);
    Route::apiResource('/consumable', ConsumableController::class);
    Route::apiResource('/staff', StaffController::class);

   Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/users', [AuthController::class, 'users']);
   });
});

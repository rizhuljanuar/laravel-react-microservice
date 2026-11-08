<?php

use App\Http\Controllers\ImageController;
use App\Http\Controllers\OAuthController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('/user', [UserController::class, 'user']);
    Route::put('/users/info', [UserController::class, 'updateInfo']);
    Route::put('/users/password', [UserController::class, 'updatePassword']);
    Route::apiResource('users', UserController::class);
    Route::apiResource('roles', RoleController::class);
    Route::apiResource('products', ProductController::class);
    Route::apiResource('orders', OrderController::class)->only(['index', 'show']);
    Route::apiResource('permissions', PermissionController::class)->only(['index']);
    Route::get('/export', [OrderController::class, 'export']);

    Route::post('/upload', [ImageController::class, 'upload']);
});

Route::post('/login', [OAuthController::class, 'login']);
Route::post('/register', [OAuthController::class, 'register']);

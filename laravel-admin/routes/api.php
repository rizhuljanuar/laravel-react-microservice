<?php

use App\Http\Controllers\OAuthController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('/user', [UserController::class, 'user']);
    Route::put('/users/info', [UserController::class, 'updateInfo']);
    Route::put('/users/password', [UserController::class, 'updatePassword']);
    Route::apiResource('users', UserController::class);
        Route::apiResource('roles', RoleController::class);
});

Route::post('/login', [OAuthController::class, 'login']);
Route::post('/register', [OAuthController::class, 'register']);

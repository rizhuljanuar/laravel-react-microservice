<?php

use App\Http\Controllers\OAuthController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::apiResource('users', UserController::class);
});

Route::post('/login', [OAuthController::class, 'login']);
Route::post('/register', [OAuthController::class, 'register']);

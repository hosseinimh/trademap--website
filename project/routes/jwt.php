<?php

use App\Http\Controllers\HSFileController;
use App\Http\Controllers\JWTUserController;
use Illuminate\Support\Facades\Route;

// not logged users
Route::middleware(['cors'])->group(function () {
    Route::post('users/login', [JWTUserController::class, 'login']);
    Route::post('users/logout', [JWTUserController::class, 'logout']);
});

// 'administrator' type users
Route::middleware(['jwt', 'auth.administrator'])->group(function () {
    Route::post('hs_codes/store', [HSFileController::class, 'store']);
});

// 'user' type users
Route::middleware(['jwt', 'auth.user'])->group(function () {
});

// 'user|administrator' type users
Route::middleware(['jwt', 'auth.logged'])->group(function () {
});

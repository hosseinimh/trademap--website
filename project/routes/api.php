<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HSFileController;
use App\Http\Controllers\TradeController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// not logged users
Route::middleware(['cors'])->group(function () {
    Route::post('users/login', [UserController::class, 'login']);
    Route::post('users/logout', [UserController::class, 'logout']);
});

// 'administrator' type users
Route::middleware(['auth:sanctum', 'jwt.auth.administrator'])->group(function () {
    Route::post('dashboard/review_admin', [DashboardController::class, 'reviewAdmin']);

    Route::post('users', [UserController::class, 'index']);
    Route::post('users/show/{model}', [UserController::class, 'showAdministrator']);
    Route::post('users/store', [UserController::class, 'storeAdministrator']);
    Route::post('users/update/{model}', [UserController::class, 'updateAdministrator']);
    Route::post('users/update/{model}', [UserController::class, 'updateUser']);
    Route::post('users/change_password/{model}', [UserController::class, 'changePassword']);

    Route::post('hs_files', [HSFileController::class, 'index']);
    Route::post('hs_files/download/{hs}/{type}', [HSFileController::class, 'download']);

    Route::post('hs_codes', [TradeController::class, 'index']);
});

// 'user' type users
Route::middleware(['auth:sanctum', 'jwt.auth.user'])->group(function () {
    Route::post('dashboard/review_user', [DashboardController::class, 'reviewUser']);

    Route::post('users/show', [UserController::class, 'showUser']);
});

// 'user|administrator' type users
Route::middleware(['auth:sanctum', 'jwt.auth.logged'])->group(function () {
});

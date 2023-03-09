<?php

use App\Http\Controllers\HSFileController;
use Illuminate\Support\Facades\Route;

Route::get('{path}', function () {
    return view('index');
})->where('path', '^((?!api).)*$');

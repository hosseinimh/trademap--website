<?php

namespace App\Providers;

use App\Constants\Theme;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HSFileController;
use App\Http\Controllers\TradeController;
use App\Http\Controllers\UserController;
use App\Http\Resources\HSFileResource;
use App\Http\Resources\TradeResource;
use App\Http\Resources\UserResource;
use App\Packages\Helper;
use App\Packages\JsonResponse;
use App\Services\HSFileService;
use App\Services\TradeService;
use App\Services\UserService;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

require_once __DIR__ . '/../../server-config.php';

class AppServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind('helper', function ($app) {
            return new Helper();
        });
    }

    public function boot()
    {
        $this->app->bind('path.public', function () {
            return PUBLIC_PATH;
        });

        View::share('THEME', Theme::class);

        $this->app->bind(DashboardController::class, function ($app) {
            return new DashboardController($app->make(JsonResponse::class));
        });

        $this->app->bind(UserController::class, function ($app) {
            return new UserController(new JsonResponse(UserResource::class), $app->make(UserService::class));
        });

        $this->app->bind(HSFileController::class, function ($app) {
            return new HSFileController(new JsonResponse(HSFileResource::class), $app->make(HSFileService::class));
        });

        $this->app->bind(TradeController::class, function ($app) {
            return new TradeController(new JsonResponse(TradeResource::class), $app->make(TradeService::class));
        });
    }
}

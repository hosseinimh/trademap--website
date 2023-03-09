<?php

namespace App\Http\Controllers;

use App\Constants\ErrorCode;
use App\Constants\Role;
use App\Http\Requests\User\ChangePasswordRequest;
use App\Http\Requests\User\IndexUsersRequest;
use App\Http\Requests\User\LoginUserRequest as LoginRequest;
use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Models\User as Model;
use App\Packages\JsonResponse;
use App\Services\UserService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class UserController extends Controller
{
    public function __construct(JsonResponse $response, public UserService $service)
    {
        parent::__construct($response);
    }

    public function index(IndexUsersRequest $request): HttpJsonResponse
    {
        return $this->onItems($this->service->getPaginate($request->username, $request->name, $request->name, $request->_pn, $request->_pi), $this->service->count($request->username, $request->name, $request->name));
    }

    public function showUser(): HttpJsonResponse
    {
        return $this->onItem($this->service->get(auth()->user()->id));
    }

    public function showAdministrator(Model $model): HttpJsonResponse
    {
        return $this->onItem($model);
    }

    public function storeAdministrator(StoreUserRequest $request): HttpJsonResponse
    {
        return $this->onStore($this->service->store($request->username, $request->password, $request->name, $request->family, $request->mobile, Role::ADMINISTRATOR, $request->is_active));
    }

    public function storeUser(StoreUserRequest $request): HttpJsonResponse
    {
        return $this->onStore($this->service->store($request->username, $request->password, $request->name, $request->family, $request->mobile, Role::USER, $request->is_active));
    }

    public function updateAdministrator(Model $model, UpdateUserRequest $request): HttpJsonResponse
    {
        return $this->onUpdate($this->service->update($model, $request->name, $request->family, $request->mobile, Role::ADMINISTRATOR, $request->is_active));
    }

    public function updateUser(Model $model, UpdateUserRequest $request): HttpJsonResponse
    {
        return $this->onUpdate($this->service->update($model, $request->name, $request->family, $request->mobile, Role::USER, $request->is_active));
    }

    public function changePassword(Model $model, ChangePasswordRequest $request): HttpJsonResponse
    {
        return $this->onUpdate($this->service->changePassword($model, $request->new_password));
    }

    public function login(LoginRequest $request): HttpJsonResponse
    {
        if (!auth()->attempt(['username' => $request->username, 'password' => $request->password, 'is_active' => 1])) {
            return $this->onError(['_error' => __('user.user_not_found'), '_errorCode' => ErrorCode::USER_NOT_FOUND]);
        }

        return $this->onItem(auth()->user());
    }

    public function logout(): HttpJsonResponse
    {
        auth()->logout();

        return $this->onOk();
    }
}

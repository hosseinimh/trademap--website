<?php

namespace App\Http\Controllers;

use App\Constants\ErrorCode;
use App\Http\Requests\User\LoginUserRequest as LoginRequest;
use Illuminate\Routing\Controller as BaseController;

class JWTUserController extends BaseController
{
    public function login(LoginRequest $request)
    {
        if (!$token = auth('jwt')->attempt(['username' => $request->username, 'password' => $request->password, 'is_active' => 1])) {
            return response()->json(['_error' => __('user.user_not_found'), '_errorCode' => ErrorCode::USER_NOT_FOUND]);
        }

        return response()->json(['_result' => '1', '_token' => $this->respondWithToken($token)], 200);
    }

    public function logout()
    {
        auth('jwt')->logout();

        return $this->onOk();
    }

    public function refresh()
    {
        return $this->respondWithToken(auth('jwt')->refresh());
    }

    protected function respondWithToken($token)
    {
        return [
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('jwt')->factory()->getTTL() * 60
        ];
    }
}

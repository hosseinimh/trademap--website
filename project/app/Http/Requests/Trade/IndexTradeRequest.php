<?php

namespace App\Http\Requests\Trade;

use App\Constants\ErrorCode;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class IndexTradeRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        $response = new Response(['_result' => '0', '_error' => $validator->errors()->first(), '_errorCode' => ErrorCode::FORM_INPUT_INVALID], 200);

        throw new ValidationException($validator, $response);
    }

    public function rules()
    {
        return [
            'hs' => 'required|digits_between:2,6|numeric',
        ];
    }

    public function messages()
    {
        return [
            'hs.required' => __('trade.hs_required'),
            'hs.digits_between' => __('trade.hs_digits_between'),
            'hs.numeric' => __('trade.hs_numeric'),
        ];
    }
}

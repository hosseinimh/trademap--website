<?php

namespace App\Http\Requests\HSFile;

use App\Constants\ErrorCode;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class IndexHSFilesRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        $response = new Response(['_result' => '0', '_error' => $validator->errors()->first(), '_errorCode' => ErrorCode::FORM_INPUT_INVALID], 200);

        throw new ValidationException($validator, $response);
    }

    public function rules()
    {
        return [
            'hs' => 'digits_between:0,6|numeric',
        ];
    }

    public function messages()
    {
        return [
            'hs.digits_between' => __('hs_file.hs_digits_between'),
            'hs.numeric' => __('hs_file.hs_numeric'),
        ];
    }
}

<?php

namespace App\Http\Resources;

use App\Facades\Helper;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'username' => $this->username,
            'name' => Helper::localeNumbers($this->name) ?? '',
            'family' => Helper::localeNumbers($this->family) ?? '',
            'role' => intval($this->role),
            'mobile' => $this->mobile ?? '',
            'isActive' => intval($this->is_active),
        ];
    }
}

<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TradeResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'hs' => $this->hs,
            'trader' => $this->trader,
            'type' => intval($this->type),
            'year' => intval($this->year),
            'value' => intval($this->value),
        ];
    }
}

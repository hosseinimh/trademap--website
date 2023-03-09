<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class HSFileResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'hs' => $this->hs,
            'type' => intval($this->type),
            'file' => $this->file,
            'tradesCount' => intval($this->trades_count),
        ];
    }
}

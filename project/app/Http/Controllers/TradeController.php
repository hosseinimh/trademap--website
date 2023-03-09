<?php

namespace App\Http\Controllers;

use App\Http\Requests\Trade\IndexTradeRequest;
use App\Packages\JsonResponse;
use App\Services\TradeService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class TradeController extends Controller
{
    public function __construct(JsonResponse $response, public TradeService $service)
    {
        parent::__construct($response);
    }

    public function index(IndexTradeRequest $request): HttpJsonResponse
    {
        $hs = intval($request->hs);
        $hs = $hs > 0 ? $hs : null;
        $type = intval($request->type);
        $type = in_array($type, [1, 2]) ? $type : 1;

        return $this->onItems($this->service->getPaginate($hs, $type, $request->_pn, $request->_pi), $this->service->count($hs, $type));
    }
}

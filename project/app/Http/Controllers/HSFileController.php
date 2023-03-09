<?php

namespace App\Http\Controllers;

use App\Constants\ErrorCode;
use App\Constants\StoragePath;
use App\Constants\UploadedFile;
use App\Http\Requests\HSFile\IndexHSFilesRequest;
use App\Models\HSFile as Model;
use App\Packages\JsonResponse;
use App\Services\HSFileService;
use App\Services\TradeService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;
use Illuminate\Http\Request;

class HSFileController extends Controller
{
    public function __construct(JsonResponse $response, public HSFileService $service)
    {
        parent::__construct($response);
    }

    public function index(IndexHSFilesRequest $request): HttpJsonResponse
    {
        $hs = intval($request->hs);
        $hs = $hs > 0 ? $hs : null;
        $type = intval($request->type);
        $type = in_array($type, [1, 2]) ? $type : 1;

        return $this->onItems($this->service->getPaginate($hs, $type, $request->_pn, $request->_pi), $this->service->count($hs, $type));
    }

    public function store(Request $request): HttpJsonResponse
    {
        if (($hs = Model::create())) {
            $response = [];
            $uploadResult = (new FileUploaderController(StoragePath::HS_FILE))->uploadHSFile($hs, $request);
            $response['uploaded'] = $uploadResult['uploaded'];
            $response['uploadedText'] = $uploadResult['uploadedText'];

            if ($uploadResult['uploaded'] === UploadedFile::OK) {
                $this->service->deleteOthers($uploadResult['hs']);
                $service = new TradeService();
                $result = $service->import($uploadResult['path'], $uploadResult['hs'], $uploadResult['type']);

                if ($result) {
                    return $this->onOk();
                }

                return $this->onError(['_error' => __('general.store_error'), '_errorCode' => ErrorCode::STORE_ERROR]);
            }

            return $this->onError(['_error' => __('general.store_error'), '_errorCode' => ErrorCode::STORE_ERROR]);
        }

        return $this->onError(['_error' => __('general.store_error'), '_errorCode' => ErrorCode::STORE_ERROR]);
    }

    public function download(string $hs, int $type)
    {
        $hsFileRecord = $this->service->getByHsType($hs, $type);

        if (!$hsFileRecord) {
            return;
        }

        $file = storage_path('app') . '/' . StoragePath::HS_FILE . '/' . $hsFileRecord->file;
        $filename = $hs . ' - ' . ($type == 1 ? 'Imports' : 'Exports') . '.txt';
        $headers = ['Content-Type: text/plain'];

        return response()->download($file, $filename, $headers);
    }
}

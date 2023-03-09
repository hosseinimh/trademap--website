<?php

namespace App\Http\Controllers;

use App\Constants\UploadedFile;
use App\Facades\Helper;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class FileUploaderController extends Controller
{
    function __construct(private string $storagePath)
    {
        $this->storagePath = $storagePath;
    }

    public function uploadImage(Model $model, Request $request, string $requestKey, string $modelColumn)
    {
        $result = ['uploaded' => UploadedFile::NOT_UPLOADED_ERROR, 'uploadedText' => ''];

        if ($request->hasFile($requestKey) && $request->file($requestKey)->isValid()) {
            if (($fileMimeType = $request->file($requestKey)->getMimeType()) && ($fileMimeType === 'image/jpeg' || $fileMimeType === 'image/png')) {
                $path = $request->$requestKey->store($this->storagePath);
                Helper::resizeImage(storage_path('app') . '/' . $path, 200);

                if ($path) {
                    @unlink(storage_path('app') . '/' . $this->storagePath . '/' . $model->$modelColumn);

                    $data = [$modelColumn => basename($path)];
                    $result['uploaded'] = $model->update($data) ? UploadedFile::OK : UploadedFile::ERROR;
                } else {
                    $result['uploaded'] = UploadedFile::UPLOAD_ERROR;
                }
            } else {
                $result['uploaded'] = UploadedFile::MIME_TYPE_ERROR;
            }
        } else {
            $result['uploaded'] = UploadedFile::NOT_UPLOADED_ERROR;
        }

        $result['uploadedText'] = $this->getUploadedText($result['uploaded']);

        return $result;
    }

    public function uploadHSFile(Model $model, Request $request)
    {
        $result = ['uploaded' => UploadedFile::NOT_UPLOADED_ERROR, 'uploadedText' => '', 'path' => '', 'hs' => '', 'type' => ''];

        if ($request->hasFile('file') && $request->file('file')->isValid()) {
            if (($fileMimeType = $request->file('file')->getMimeType()) && ($fileMimeType === 'text/plain')) {
                $path = $request->file->store($this->storagePath);

                if ($path) {
                    @unlink(storage_path('app') . '/' . $this->storagePath . '/' . $model->file);

                    $filename = $request->file('file')->getClientOriginalName();
                    $arr = explode(' - ', $filename);

                    if (count($arr) === 2) {
                        $type = str_contains($arr[1], 'Imports') ? 1 : 2;
                        $data = ['hs' => $arr[0], 'type' => $type, 'file' => basename($path)];
                        $result['uploaded'] = $model->update($data) ? UploadedFile::OK : UploadedFile::ERROR;
                        $result['hs'] = $arr[0];
                        $result['type'] = $type;
                        $result['path'] = storage_path('app') . '/' . $this->storagePath . '/' . basename($path);
                    } else {
                        $result['uploaded'] = UploadedFile::UPLOAD_ERROR;
                    }
                } else {
                    $result['uploaded'] = UploadedFile::UPLOAD_ERROR;
                }
            } else {
                $result['uploaded'] = UploadedFile::MIME_TYPE_ERROR;
            }
        } else {
            $result['uploaded'] = UploadedFile::NOT_UPLOADED_ERROR;
        }

        $result['uploadedText'] = $this->getUploadedText($result['uploaded']);

        return $result;
    }

    public function uploadFile(Model $model, Request $request, string $requestKey, string $modelColumn)
    {
        $result = ['uploaded' => UploadedFile::NOT_UPLOADED_ERROR, 'uploadedText' => '', 'path' => ''];

        if ($request->hasFile($requestKey) && $request->file($requestKey)->isValid()) {
            $path = $request->$requestKey->store($this->storagePath);

            if ($path) {
                @unlink(storage_path('app') . '/' . $this->storagePath . '/' . $model->$modelColumn);

                $data = [$modelColumn => basename($path)];
                $result['uploaded'] = $model->update($data) ? UploadedFile::OK : UploadedFile::ERROR;

                if ($result['uploaded'] === UploadedFile::OK) {
                    $result['path'] = $data[$modelColumn];
                }
            } else {
                $result['uploaded'] = UploadedFile::UPLOAD_ERROR;
            }
        } else {
            $result['uploaded'] = UploadedFile::NOT_UPLOADED_ERROR;
        }

        $result['uploadedText'] = $this->getUploadedText($result['uploaded']);

        return $result;
    }

    private function getUploadedText($uploaded)
    {
        $text = __('general.uploaded_undefined');

        if ($uploaded >= 1 && $uploaded <= 6) {
            $text = __('general.uploaded_' . $uploaded);
        }

        return $text;
    }
}

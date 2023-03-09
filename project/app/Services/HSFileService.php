<?php

namespace App\Services;

use App\Constants\StoragePath;
use App\Models\HSFile as Model;
use Illuminate\Support\Facades\DB;

class HSFileService
{
    public function get(int $id): mixed
    {
        return
            Model::where('id', $id)->first();
    }

    public function getByHsType(int $hs, int $type): mixed
    {
        return Model::where('hs', $hs)->where('type', $type)->first();
    }

    public function getPaginate(int|null $hs, int $type, int $page, int $pageItems): mixed
    {
        return Model::join('tbl_trades', function ($join) {
            $join->on('tbl_hs_files.hs', '=', 'tbl_trades.hs');
            $join->on('tbl_hs_files.type', '=', 'tbl_trades.type');
        })->where('tbl_hs_files.hs', 'LIKE', '%' . $hs . '%')->where('tbl_hs_files.type', $type)->select('tbl_hs_files.*', DB::raw('COUNT(tbl_trades.id) AS trades_count'))->groupBy('tbl_hs_files.hs')->orderBy('tbl_hs_files.hs', 'ASC')->orderBy('tbl_hs_files.id', 'ASC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
    }

    public function store(): mixed
    {
        $data = [];
        $model = Model::create($data);

        return $model ?? null;
    }

    public function update(Model $model, string $hs, string $file): bool
    {
        $data = [
            'hs' => $hs,
            'file' => $file,
        ];

        return $model->update($data);
    }

    public function deleteOthers(string $hs): void
    {
        $records = $this->getOthers($hs);

        foreach ($records as $record) {
            @unlink(storage_path('app') . '/' . StoragePath::HS_FILE . '/' . $record->file);
            $record->delete();
        }
    }

    public function count(int|null $hs, int $type): int
    {
        $array = Model::join('tbl_trades', function ($join) {
            $join->on('tbl_hs_files.hs', '=', 'tbl_trades.hs');
            $join->on('tbl_hs_files.type', '=', 'tbl_trades.type');
        })->where('tbl_hs_files.hs', 'LIKE', '%' . $hs . '%')->where('tbl_hs_files.type', $type)->select('tbl_hs_files.*')->groupBy('tbl_hs_files.hs')->get();

        return count($array);
    }

    private function getOthers(string $hs): mixed
    {
        return Model::where('hs', '!=', $hs)->get();
    }
}

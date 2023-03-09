<?php

namespace App\Services;

use App\Facades\Helper;
use App\Models\Trade as Model;

class TradeService
{
    public function getPaginate(int|null $hs, int $type, int $page, int $pageItems): mixed
    {
        $years = [];
        $array = Model::where('hs', 'LIKE', '%' . $hs . '%')->where('type', $type)->select('trader', 'hs', 'type')->groupBy('trader')->orderBy('id', 'ASC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();

        foreach ($array as $record) {
            $traderValues = Model::where('hs', 'LIKE', '%' . $hs . '%')->where('type', $type)->where('trader', $record->trader)->get();

            if (count($traderValues) >= 5) {
                for ($i = 0; $i < 5; $i++) {
                    $years = [...$years, $traderValues[$i]['year']];
                    $record['year' . ($i + 1)] = $traderValues[$i]['year'];
                    $record['value' . ($i + 1)] = $traderValues[$i]['value'];
                }
            }
        }

        return ['items' => $array, 'years' => array_unique($years)];
    }

    public function import(string $path, string $hs, int $type): bool
    {
        Model::where('hs', $hs)->where('type', $type)->delete();

        $handle = fopen($path, "r");

        if ($handle) {
            $line = fgets($handle);

            if ($line) {
                $needle = $type === 1 ? 'Imported value in ' : 'Exported value in ';
                $positions = Helper::findAll($line, $needle);

                if (count($positions) !== 5) {
                    fclose($handle);

                    return false;
                }

                $needleLength = strlen($needle);
                $years = [];

                foreach ($positions as $position) {
                    $years[] = intval(substr($line, $position + $needleLength, 4));
                }
            }

            while (($line = fgets($handle)) !== false) {
                $parts = preg_split('/\s+/', $line);

                if (count($parts) === 7) {
                    $parts[0] = str_replace('"', "", $parts[0]);

                    for ($i = 0; $i < 6; $i++) {
                        Model::create(['hs' => $hs, 'type' => $type, 'trader' => $parts[0], 'year' => $years[$i], 'value' => $parts[$i + 1]]);
                    }
                }
            }

            fclose($handle);
        }

        return true;
    }

    public function count(int|null $hs, int $type): int
    {
        $array = Model::where('hs', 'LIKE', '%' . $hs . '%')->where('type', $type)->groupBy('trader')->get();

        return count($array);
    }
}

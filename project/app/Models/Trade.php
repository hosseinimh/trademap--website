<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Trade extends Model
{
    use HasFactory;

    protected $table = 'tbl_trades';
    protected $fillable = [
        'hs',
        'type',
        'trader',
        'year',
        'value',
    ];
}

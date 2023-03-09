<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HSFile extends Model
{
    use HasFactory;

    protected $table = 'tbl_hs_files';
    protected $fillable = [
        'hs',
        'type',
        'file',
    ];
}

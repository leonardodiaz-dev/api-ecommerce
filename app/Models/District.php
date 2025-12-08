<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class District extends Model
{
    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function province(){
        return $this->belongsTo(Province::class);
    }
}

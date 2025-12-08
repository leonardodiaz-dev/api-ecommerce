<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Gender extends Model
{
     protected $hidden = [
        'created_at',
        'updated_at',
    ];
    public function articles(){
        return $this->hasMany(Article::class);
    }
}

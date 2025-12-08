<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    protected $fillable = ['nombre','estado'];

     protected $hidden = [
        'created_at',
        'updated_at',
    ];
    public function articles(){
        return $this->hasMany(Article::class);
    }
}

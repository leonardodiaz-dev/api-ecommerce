<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    protected $fillable = ['nombre','isPrincipal','user_id','district_id'];

    public function district(){
        return $this->belongsTo(District::class);
    }
}

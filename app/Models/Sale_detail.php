<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sale_detail extends Model
{
    protected $fillable = ['sale_id','variant_id','cantidad','precio','descuento'];

    public function variant(){
        return $this->belongsTo(Variant::class);
    }
}

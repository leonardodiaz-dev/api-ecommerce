<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sale_detail extends Model
{
    protected $fillable = ['sale_id','variant_id','cantidad','precio','descuento'];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];
    
    public function variant(){
        return $this->belongsTo(Variant::class);
    }
    public function sale(){
        return $this->belongsTo(Sale::class);
    }
}

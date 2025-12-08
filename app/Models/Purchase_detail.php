<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Purchase_detail extends Model
{
    protected $fillable = ['cantidad','variant_id','purchase_id'];

    public function variant(){
        return $this->belongsTo(Variant::class);
    }
    public function purchase(){
        return $this->belongsTo(Purchase::class);
    }
}

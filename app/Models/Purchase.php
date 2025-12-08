<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Purchase extends Model
{
    protected $fillable = ['fecha', 'supplier_id'];

    public function variants()
    {
        return $this->belongsToMany(Variant::class, 'purchase_details', 'purchase_id', 'variant_id')
            ->withPivot('cantidad')
            ->withTimestamps();
    }
}

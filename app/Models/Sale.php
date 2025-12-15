<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    protected $fillable = ['fecha', 'user_id', 'address_id', 'total', 'estado'];

    public function details()
    {
        return $this->hasMany(Sale_detail::class);
    }
}

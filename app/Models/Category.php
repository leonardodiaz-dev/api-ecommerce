<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['nombre', 'estado'];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];
    public function subcategories(){
        return $this->hasMany(Subcategory::class);
    }
}

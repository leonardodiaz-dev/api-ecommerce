<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subcategory extends Model
{
    protected $fillable = ['nombre', 'estado','category_id'];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    public function subsubcategories()
    {
        return $this->hasMany(Subsubcategory::class);
    }
}

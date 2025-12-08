<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subsubcategory extends Model
{
    protected $fillable = ['nombre', 'estado', 'subcategory_id'];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function subcategory()
    {
        return $this->belongsTo(Subcategory::class);
    }
    public function articles()
    {
        return $this->hasMany(Article::class);
    }
}

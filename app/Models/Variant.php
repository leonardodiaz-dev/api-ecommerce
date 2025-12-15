<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Variant extends Model
{
    protected $fillable = ['color_id', 'size_id', 'article_id'];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];
    
    public function article()
    {
        return $this->belongsTo(Article::class);
    }
    public function color()
    {
        return $this->belongsTo(Color::class);
    }
    public function size()
    {
        return $this->belongsTo(Size::class);
    }
    public function purchases()
    {
        return $this->belongsToMany(Purchase::class, 'purchase_details', 'variant_id', 'purchase_id')
            ->withPivot('cantidad')
            ->withTimestamps();
    }
}

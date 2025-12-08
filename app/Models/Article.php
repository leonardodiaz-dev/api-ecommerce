<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Article extends Model
{
    use HasFactory;

    protected $fillable = ['nombre', 'estado', 'codigo', 'slug', 'precioVenta', 'imagen', 'brand_id', 'gender_id', 'subsubcategory_id'];
    
    protected $hidden = [
        'created_at',
        'updated_at',
    ];
    
    public static function generarCodigo()
    {
        do {
            $codigo = str_pad(random_int(0, 999999999), 9, '0', STR_PAD_LEFT);
        } while (self::where('codigo', $codigo)->exists());

        return $codigo;
    }
    public static function generarSlug($nombre)
    {
        do {
            $slugBase = Str::slug($nombre);
            $slug = $slugBase . '-' . rand(100000, 999999);
        } while (self::where('slug', $slug)->exists());

        return $slug;
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function gender()
    {
        return $this->belongsTo(Gender::class);
    }

    public function subsubcategory()
    {
        return $this->belongsTo(Subsubcategory::class);
    }

    public function variants()
    {
        return $this->hasMany(Variant::class);
    }
}

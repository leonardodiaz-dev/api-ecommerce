<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ArticleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'codigo' => $this->codigo,
            'nombre' => $this->nombre,
            'slug' => $this->slug,
            'precioVenta' => $this->precioVenta,
            'imagen' => $this->imagen,
            'estado' => $this->estado,
            'gender' => new GenderResource($this->whenLoaded('gender')),
            'subsubcategory' => new SubsubcategoryResource($this->whenLoaded('subsubcategory')),
            'brand' => new BrandResource($this->whenLoaded('brand')),
            'variants' => VariantResource::collection($this->whenLoaded('variants'))
        ];
    }
}

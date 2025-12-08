<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AddressResource extends JsonResource
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
            'nombre' => $this->nombre,
            'isPrincipal' => $this->isPrincipal,
            'district_id' => $this->district_id,
            'district' => $this->whenLoaded('district', function () {
                return $this->district?->nombre;
            }),
            'department' => $this->whenLoaded('district.province.department', function () {
                return $this->district?->province?->department?->nombre;
            }),
        ];
    }
}

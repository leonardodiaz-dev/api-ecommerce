<?php

namespace Database\Seeders;

use App\Models\Color;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ColorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $colors = [
            ['nombre' => 'Azul', 'codigoHex' => '#0000FF'],
            ['nombre' => 'Amarillo','codigoHex' => '#FFFF00'],
            ['nombre' => 'Rojo','codigoHex' =>'#FF0000']
        ];
        foreach ($colors as $value) {
            Color::create([
                'nombre' => $value['nombre'],
                'codigoHex' => $value['codigoHex']
            ]);
        }
    }
}

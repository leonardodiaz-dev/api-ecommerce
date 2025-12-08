<?php

namespace Database\Seeders;

use App\Models\Size;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SizeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tallas = [
            // Calzado
            ['nombre' => '5 US', 'tipo' => 'calzado'],
            ['nombre' => '5.5 US', 'tipo' => 'calzado'],
            ['nombre' => '6 US', 'tipo' => 'calzado'],
            ['nombre' => '6.5 US', 'tipo' => 'calzado'],
            ['nombre' => '7 US', 'tipo' => 'calzado'],
            ['nombre' => '7.5 US', 'tipo' => 'calzado'],
            ['nombre' => '8 US', 'tipo' => 'calzado'],
            ['nombre' => '8.5 US', 'tipo' => 'calzado'],
            ['nombre' => '9 US', 'tipo' => 'calzado'],
            ['nombre' => '9.5 US', 'tipo' => 'calzado'],
            ['nombre' => '10 US', 'tipo' => 'calzado'],

            // Ropa (Tallas alfanuméricas)
            ['nombre' => 'S', 'tipo' => 'ropa'],
            ['nombre' => 'M', 'tipo' => 'ropa'],
            ['nombre' => 'L', 'tipo' => 'ropa'],
            ['nombre' => 'XL', 'tipo' => 'ropa'],
            ['nombre' => 'XXL', 'tipo' => 'ropa'],

            // Ropa (Tallas numéricas/Pantalones)
            ['nombre' => '28', 'tipo' => 'ropa'],
            ['nombre' => '30', 'tipo' => 'ropa'],
            ['nombre' => '32', 'tipo' => 'ropa'],
            ['nombre' => '34', 'tipo' => 'ropa'],
            ['nombre' => '36', 'tipo' => 'ropa'],
            ['nombre' => '38', 'tipo' => 'ropa'],

            // Infantil
            ['nombre' => '2', 'tipo' => 'infantil'],
            ['nombre' => '4', 'tipo' => 'infantil'],
            ['nombre' => '6', 'tipo' => 'infantil'],
            ['nombre' => '8', 'tipo' => 'infantil'],
            ['nombre' => '10', 'tipo' => 'infantil'],
            ['nombre' => '12', 'tipo' => 'infantil'],
            ['nombre' => '14', 'tipo' => 'infantil'],
        ];
        foreach ($tallas as $talla) {
            Size::create([
                'nombre' => $talla['nombre'], 
                'tipo' => $talla['tipo'],    
            ]);
        }
    }
}

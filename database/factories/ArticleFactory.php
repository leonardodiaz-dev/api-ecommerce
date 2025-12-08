<?php

namespace Database\Factories;

use App\Models\Article;
use App\Models\Brand;
use App\Models\Gender;
use App\Models\Subsubcategory;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Article>
 */
class ArticleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $nombre = fake()->words(3, true);
        return [
            'nombre' => ucfirst($nombre),
            'codigo' => fake()->numerify('#########'),
            'slug' => Article::generarSlug($nombre),
            'precioVenta' => fake()->randomFloat(2, 20, 300),
            'imagen' => null,
            'brand_id' => Brand::inRandomOrder()->value('id'),
            'gender_id' => Gender::inRandomOrder()->value('id'),
            'subsubcategory_id' => Subsubcategory::inRandomOrder()->value('id'),
        ];
    }
}

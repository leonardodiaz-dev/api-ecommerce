<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categoriesData = [
            'Tecnología' => [
                'Smartphones' => [
                    'Android',
                    'iOS',
                ],
                'Laptops' => [
                    'Gaming',
                    'Empresarial',
                ],
            ],
            'Moda' => [
                'Ropa' => [
                    'Camisetas',
                    'Pantalones',
                ],
                'Calzado' => [
                    'Deportivo',
                    'Formal',
                ],
            ],
            'Hogar' => [
                'Muebles' => [
                    'Sofás',
                    'Mesas',
                ],
            ],
        ];

        foreach ($categoriesData as $categoryName => $subcategories) {

            $category = DB::table('categories')->insertGetId([
                'nombre' => $categoryName,
                'estado' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            foreach ($subcategories as $subcategoryName => $subsubcategories) {

                $subcategory = DB::table('subcategories')->insertGetId([
                    'nombre' => $subcategoryName,
                    'estado' => true,
                    'category_id' => $category,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                foreach ($subsubcategories as $subsubcategoryName) {
                    DB::table('subsubcategories')->insert([
                        'nombre' => $subsubcategoryName,
                        'estado' => true,
                        'subcategory_id' => $subcategory,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }
        }
    }
}

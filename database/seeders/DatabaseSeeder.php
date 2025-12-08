<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->call([
            BrandSeeder::class,
            CategorySeeder::class,
            SizeSeeder::class,
            GenderSeeder::class,
            RoleSeeder::class,
            ColorSeeder::class,
            UbigeoSeeder::class
        ]);
        Article::factory(100)->create();
    }
}

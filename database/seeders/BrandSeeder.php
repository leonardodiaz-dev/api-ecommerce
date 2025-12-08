<?php

namespace Database\Seeders;

use App\Models\Brand;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $brands = [
            'Samsung',
            'Apple',
            'Sony',
            'Dell',
            'Logitech',
            'Xiaomi',
            'HP',
            'Lenovo',
            'Asus',
            'Microsoft',
            'Google',
            'JBL',
            'Canon',
            'Nikon',
            'Nike',
            'Adidas',
            'Levi\'s',
            'Zara',
            'H&M',
            'Calvin Klein',
            'Tommy Hilfiger',
            'Polo Ralph Lauren',
            'Vans',
            'Converse',
            'Columbia',
            'The North Face',
            'Mango',
            'Tefal',
            'Philips',
            'Bosch',
            'iRobot',
            'Breville',
            'Cuisinart',
            'KitchenAid',
            'Electrolux',
            'Dyson',
            'IKEA',
            'WMF',
            'L\'Oréal',
            'Gillette',
            'Nivea',
            'Maybelline',
            'The Ordinary',
            'Dove',
            'Vichy',
            'Estée Lauder',
            'MAC Cosmetics',
            'Neutrogena',
            'LEGO',
            'Mattel',
            'Fisher-Price',
            'Hasbro',
            'Playmobil',
            'Bandai',
            'Under Armour',
            'Puma',
            'Garmin',
            'Decathlon',
            'Reebok',
            'Salomon',
            'Penguin Random House',
            'Planeta',
            'Amazon Publishing',
        ];
        foreach ($brands as $item) {
            Brand::create([
                'nombre' => $item
            ]);
        }
    }
}

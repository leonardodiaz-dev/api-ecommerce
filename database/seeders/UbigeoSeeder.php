<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UbigeoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $departamentosJson = json_decode(file_get_contents(database_path('seeders/json/departamentos.json')), true);
        $provinciasJson = json_decode(file_get_contents(database_path('seeders/json/provincias.json')), true);
        $distritosJson = json_decode(file_get_contents(database_path('seeders/json/distritos.json')), true);

        $provinciasArray = collect($provinciasJson)->flatten(1);
        $distritosArray = collect($distritosJson)->flatten(1);

        DB::table('districts')->delete();
        DB::table('provinces')->delete();
        DB::table('departments')->delete();

        $depMap = [];
        $provMap = [];

        foreach ($departamentosJson as $dep) {
            $id = DB::table('departments')->insertGetId([
                'nombre' => $dep['nombre_ubigeo'],
            ]);
            $depMap[$dep['id_ubigeo']] = $id;
        }

        foreach ($provinciasArray as $prov) {
            $departamentoId = $depMap[$prov['id_padre_ubigeo']] ?? null;

            if (!$departamentoId) {
                dump("Departamento no encontrado para provincia: {$prov['nombre_ubigeo']}");
                continue;
            }

            $id = DB::table('provinces')->insertGetId([
                'nombre' => $prov['nombre_ubigeo'],
                'department_id' => $departamentoId,
            ]);

            $provMap[$prov['id_ubigeo']] = $id;
        }

        foreach ($distritosArray as $dist) {
            $provinciaId = $provMap[$dist['id_padre_ubigeo']] ?? null;

            if (!$provinciaId) {
                dump("Provincia no encontrada para distrito: {$dist['nombre_ubigeo']}");
                continue;
            }

            DB::table('districts')->insert([
                'nombre' => $dist['nombre_ubigeo'],
                'province_id' => $provinciaId,
            ]);
        }

        echo "Ubigeo cargado correctamente\n";
    }
}

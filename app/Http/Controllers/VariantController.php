<?php

namespace App\Http\Controllers;

use App\Models\Variant;
use Illuminate\Http\Request;

class VariantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function findVariant(Request $request)
    {
        try {
            $codigo = $request->query('codigo');
            $variants = Variant::whereHas('article', fn($q) => $q->where('codigo', $codigo))
                ->with(['article', 'color', 'size'])->get();
            $variantsFormated = [];

            foreach ($variants as $value) {
                $variantsFormated[] = [
                    'id' => $value->id,
                    'stock' => $value->stock,
                    'article' => [
                        'codigo' => $value->article->codigo,
                        'nombre' => $value->article->nombre,
                    ],
                    'color' => $value->color ? [
                        'nombre' => $value->color->nombre
                    ] : null,
                    'size' => $value->size ? [
                        'nombre' => $value->size->nombre
                    ] : null,
                ];
            }

            return response()->json($variantsFormated, 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al procesar la solicitud',
                'Error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Variant $variant)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Variant $variant)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Variant $variant)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Variant $variant)
    {
        //
    }
}

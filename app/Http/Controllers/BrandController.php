<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBrandRequest;
use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $brands = Brand::all();
        return response()->json($brands);
    }

    public function getMarcasByCategoria($categoria)
    {

        try {
            $brands = Brand::whereHas('articles', function ($q) use ($categoria) {
                $q->whereHas('subsubcategory', fn($q) => $q->where('nombre', $categoria))
                    ->orWhereHas('subsubcategory.subcategory', fn($q) => $q->where('nombre', $categoria));
            })->select('id', 'nombre')->distinct()->get();

            return response()->json($brands);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al procesar la solicitud',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    public function getMarcasByArticle($nombre)
    {
        try {
            $brands = Brand::whereHas('articles', function ($q) use ($nombre) {
                $q->whereRaw('LOWER(nombre) LIKE ?', ['%' . strtolower($nombre) . '%']);
            })->select('id', 'nombre')->get();
            return response()->json($brands);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al procesar la solicitud',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBrandRequest $request)
    {
        try {
            $brand = Brand::create([
                'nombre' => $request->nombre
            ]);
            return response()->json($brand);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al procesar la solicitud',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Brand $brand)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Brand $brand)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Brand $brand)
    {
        try {
            $validator = Validator::make($request->all(), [
                'nombre' => 'required|string|max:100|unique:brands,nombre,' . $brand->id,
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Datos de validación inválidos',
                    'errors' => $validator->errors()
                ], 422);
            }

            $brand->update($validator->validated());

            return response()->json([
                'message' => 'Marca actualizada exitosamente',
                'data' => $brand
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al procesar la solicitud',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    public function changeStatus(Request $request, Brand $brand)
    {
        try {

            $validator = Validator::make($request->all(), [
                'estado' => 'required|boolean'
            ]);
            if ($validator->failed()) {
                return response()->json([
                    'message' => 'Datos de validación inválidos',
                    'errors' => $validator->errors()
                ], 422);
            }
            $brand->update($validator->validated());
            return response()->json($brand);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al procesar la solicitud',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Brand $brand)
    {
        $brand->delete();
        return response()->json(['message' => 'Brand eliminada con exito']);
    }
}

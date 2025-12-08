<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSubcategoryRequest;
use App\Http\Resources\SubcategoryResource;
use App\Models\Subcategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SubcategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $subcategories = Subcategory::with(['category'])->get();
        $subcategoriesFormated = [];
        foreach ($subcategories as $value) {
            $subcategoriesFormated[] = [
                'id' => $value->id,
                'nombre' => $value->nombre,
                'estado' => $value->estado,
                'category_id' => $value->category_id,
                'category' => [
                    'nombre' => $value['category']->nombre
                ]
            ];
        }
        return response()->json($subcategoriesFormated);
    }


    public function getSubcategoriesByCategoryId($id)
    {
        try {
            $subcategories = Subcategory::whereHas(
                'category',
                fn($q) => $q->where('id', $id)
            )->get();
            return SubcategoryResource::collection($subcategories);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al procesar la solicitud',
                'Error' => $th->getMessage()
            ], 500);
        }
    }

    public function store(StoreSubcategoryRequest $request)
    {
        try {
            $subcategory = Subcategory::create($request->validated());
            $subcategory->load('category');

            return response()->json([
                'id' => $subcategory->id,
                'nombre' => $subcategory->nombre,
                'estado' => $subcategory->estado,
                'category_id' => $subcategory->category_id,
                'category' => [
                    'nombre' => $subcategory->category->nombre
                ]
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al procesar la solicitud',
                'Error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Subcategory $subcategory)
    {
        return response()->json($subcategory);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Subcategory $subcategory)
    {
        try {
            $validator = Validator::make($request->all(), [
                'nombre' => 'required|string|max:50|unique:subcategories,nombre,' . $subcategory->id
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Datos de validacion invalidos',
                    'errors' => $validator->errors()
                ], 322);
            }
            $subcategory->update($validator->validated());
            $subcategory->load('category');

            return response()->json([
                'id' => $subcategory->id,
                'nombre' => $subcategory->nombre,
                'estado' => $subcategory->estado,
                'category_id' => $subcategory->category_id,
                'category' => [
                    'nombre' => $subcategory->category->nombre
                ]
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al procesar la solicitud',
                'Error' => $th->getMessage()
            ], 500);
        }
    }

    public function changeStatus(Request $request, Subcategory $subcategory)
    {
        try {
            $validator = Validator::make($request->all(), [
                'estado' => 'required|boolean'
            ]);
            if ($validator->failed()) {
                return response()->json([
                    'message' => 'Datos de validación inválidos',
                    'errors' => $validator->errors()
                ], 322);
            }
            $subcategory->update($validator->validated());
            return response()->json(['message' => 'El estado se actualizo con exito']);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al procesar la solicitud',
                'Error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Subcategory $subcategory)
    {
        $subcategory->delete();
        return response()->json(['message' => 'La subcategoria se elimino con exito']);
    }
}

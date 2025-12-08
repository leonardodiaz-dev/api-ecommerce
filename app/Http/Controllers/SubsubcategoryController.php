<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSubsubcategoryRequest;
use App\Http\Resources\SubsubcategoryResource;
use App\Models\Subsubcategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SubsubcategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $subsubcategories = Subsubcategory::with(['subcategory'])->get();
        $subsubcategoriesFormated = [];

        foreach ($subsubcategories as $value) {
            $subsubcategoriesFormated[] = [
                'id' => $value['id'],
                'nombre' => $value['nombre'],
                'estado' => $value['estado'],
                'subcategory' => [
                    'nombre' => $value['subcategory']->nombre
                ]
            ];
        }

        return response()->json($subsubcategoriesFormated, 200);
    }

    public function getSubsubcategoriesBySubcategory($subcategory)
    {
        try {
            $subsubcategories = Subsubcategory::whereHas(
                'subcategory',
                fn($q) => $q->where('nombre', $subcategory)
            )->get();
            return response()->json($subsubcategories);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al procesar la solicitud',
                'Error' => $th->getMessage()
            ], 500);
        }
    }

    public function getSubsubcategoriesByBrand($brand)
    {
        try {
            $subsubcategories = Subsubcategory::whereHas('articles', function ($q) use ($brand) {
                $q->whereHas('brand',fn($q2) => $q2->where('nombre',$brand));
            })->select('id','nombre')->get();
            return response()->json($subsubcategories);
        } catch (\Throwable $th) {
               return response()->json([
                'message' => 'Error al procesar la solicitud',
                'Error' => $th->getMessage()
            ], 500);
        }
    }

    public function getSubsubcategoriesBySubcategoryId($id)
    {
        try {
            $subsubcategories = Subsubcategory::whereHas(
                'subcategory',
                fn($q) => $q->where('id', $id)
            )->get();
            return SubsubcategoryResource::collection($subsubcategories);
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
    public function store(StoreSubsubcategoryRequest $request)
    {
        try {
            $subsubcategory = Subsubcategory::create($request->validated());
            $subsubcategory->load('subcategory');

            return response()->json([
                'id' => $subsubcategory['id'],
                'nombre' => $subsubcategory['nombre'],
                'estado' => $subsubcategory['estado'],
                'subcategory' => [
                    'nombre' => $subsubcategory['subcategory']->nombre
                ]
            ], 201);
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
    public function show(Subsubcategory $subsubcategory)
    {
        return response()->json([
            'id' => $subsubcategory['id'],
            'nombre' => $subsubcategory['nombre'],
            'estado' => $subsubcategory['estado'],
            'subcategory_id' => $subsubcategory['subcategory_id']
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Subsubcategory $subsubcategory)
    {
        try {
            $validator = Validator::make($request->all(), [
                'nombre' => 'required|string|max:50|unique:subsubcategories,nombre,' . $subsubcategory->id,
                'subcategory_id' => 'required|exists:subcategories,id'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Datos de validacion invalidos',
                    'errors' => $validator->errors()
                ], 322);
            }
            $subsubcategory->update($validator->validated());
            $subsubcategory->load('subcategory');

            return response()->json([
                'id' => $subsubcategory['id'],
                'nombre' => $subsubcategory['nombre'],
                'estado' => $subsubcategory['estado'],
                'subcategory' => [
                    'nombre' => $subsubcategory['subcategory']->nombre
                ]
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al procesar la solicitud',
                'Error' => $th->getMessage()
            ], 500);
        }
    }

    public function changeStatus(Request $request, Subsubcategory $subsubcategory)
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
            $subsubcategory->update($validator->validated());
            return response()->json(['message' => 'Estado actualizado con exito']);
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
    public function destroy(Subsubcategory $subsubcategory)
    {
        $subsubcategory->delete();
        return response()->json(['message' => 'La subsubcategoria se elimino con exito']);
    }
}

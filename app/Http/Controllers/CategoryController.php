<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::orderby('id','asc')->get();
        return CategoryResource::collection($categories);
    }

    public function getAllCategoriesWithHierarchy()
    {
        try {
            $categories = Category::where('estado', true)
                ->with([
                    'subcategories' => fn($q) => $q->where('estado', true),
                    'subcategories.subsubcategories' =>  fn($q) => $q->where('estado', true)
                ])->whereHas(
                    'subcategories',fn($q) => $q->where('estado', true)
                        ->whereHas('subsubcategories', fn($q2) => $q2->where('estado', true))
                )->get();

            return CategoryResource::collection($categories);
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
    public function store(StoreCategoryRequest $request)
    {
        try {
            $category = Category::create($request->validated());

            return (new CategoryResource($category))->response()->setStatusCode(201);
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
    public function show(Category $category)
    {
        return (new CategoryResource($category))->response()->setStatusCode(200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        try {
            $validator = Validator::make($request->all(), [
                'nombre' => 'required|string|max:50|unique:categories,nombre,' . $category->id
            ]);
            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Datos de validacion invalidos',
                    'errors' => $validator->errors()
                ], 422);
            }
            $category->update($validator->validated());
            return (new CategoryResource($category))->response()->setStatusCode(200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al procesar la solicitud',
                'Error' => $th->getMessage()
            ], 500);
        }
    }

    public function changeStatus(Request $request, Category $category)
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
            $category->update($validator->validated());
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
    public function destroy(Category $category)
    {
        $category->delete();
        return response()->json(['message' => 'Category eliminada con exito']);
    }
}

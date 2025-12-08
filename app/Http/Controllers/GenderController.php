<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Gender;
use Illuminate\Http\Request;

class GenderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $genders = Gender::all();
        return response()->json($genders);
    }

    public function findGenders(Request $request)
    {
        try {
            $category_nombre = $request->query('categoriaNombre');
            $genders = Gender::whereHas('articles',fn($q) =>
                $q->whereHas('subsubcategory',fn($q) =>$q->where('nombre', $category_nombre))
                    ->orWhereHas('subsubcategory.subcategory',fn($q) =>$q->where('nombre', $category_nombre))
            )
                ->select('id', 'nombre')
                ->distinct()
                ->get();
            return response()->json($genders);
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
    public function show(Gender $gender)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Gender $gender)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Gender $gender)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Gender $gender)
    {
        //
    }
}

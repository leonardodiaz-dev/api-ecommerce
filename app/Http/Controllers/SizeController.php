<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSizeRequest;
use App\Http\Resources\SizeResource;
use App\Models\Size;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SizeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sizes = Size::all();
        return SizeResource::collection($sizes);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSizeRequest $request)
    {
        try {
            $size = Size::create([
                'nombre' => $request->nombre,
                'tipo' => $request->tipo
            ]);
            return (new SizeResource($size))->response()->setStatusCode(201);
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
    public function show(Size $size)
    {
        return (new SizeResource($size))->response()->setStatusCode(200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Size $size)
    {
        try {

            $validator = Validator::make($request->all(), [
                'nombre' => 'required|string|max:20|unique:sizes,nombre,' . $size->id,
                'tipo' => 'required|string|max:20'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Datos de validacion invalidos',
                    'errors' => $validator->errors()
                ],422);
            }

            $size->update($validator->validated());
            return (new SizeResource($size))->response()->setStatusCode(200);
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
    public function destroy(Size $size)
    {
        $size->delete();
        return response()->json(['message' =>'La talla se elimino con exito']);
    }
}

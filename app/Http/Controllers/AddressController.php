<?php

namespace App\Http\Controllers;

use App\Models\Address;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class AddressController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index()
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();

            $addresses = Address::where('user_id', $user->id)
                ->with(['district.province.department'])
                ->get();

            $formattedAddresses = $addresses->map(function ($address) {

                $districtName = $address->district?->nombre;
                $departmentName = $address->district?->province?->department?->nombre;

                return [
                    'id' => $address->id,
                    'nombre' => $address->nombre,
                    'isPrincipal' => $address->isPrincipal,
                    'district' => $districtName,
                    'department' => $departmentName
                ];
            });

            return response()->json($formattedAddresses);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al procesar la solicitud',
                'Error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();

            $validator = Validator::make($request->all(), [
                'nombre' => 'required|string',
                'district_id' => 'required|exists:districts,id'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Datos de validacion invalidos',
                    'errors' => $validator->errors()
                ], 422);
            }

            $data = $validator->validated();
            $data['isPrincipal'] = false;
            $data['user_id'] = $user->id;

            $address = Address::create($data);
            $address->load('district.province.department');
            return response()->json([
                'id' => $address->id,
                'nombre' => $address->nombre,
                'isPrincipal' => $address->isPrincipal,
                'district' => $address->district->nombre,
                'department' => $address->district->province->department->nombre
            ]);
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
    public function show(Address $address)
    {
        //
    }

    public function updateEstadoIsprincipal($id)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            $direccionPrincipal = Address::where('isPrincipal', true)->first();

            if ($direccionPrincipal) {
                $direccionPrincipal->update([
                    'isPrincipal' => false
                ]);
            }

            $direccionToUpdate = Address::where('id', $id)
                ->where('user_id', $user->id)->first();

            $direccionToUpdate->update([
                'isPrincipal' => true
            ]);
            return response()->json(['message' =>'El estado se actualizo correctamente']);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al procesar la solicitud',
                'Error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Address $address)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Address $address)
    {
        $address->delete();
        return response()->json(['Direccion eliminada correctamente']);
    }
}

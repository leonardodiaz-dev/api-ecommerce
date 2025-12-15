<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use App\Models\Sale_detail;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class SaleDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function getSalesWithDetailsByUser()
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            $user_id = $user->id;
            $sales = Sale_detail::whereHas('sale', function ($q) use ($user_id) {
                $q->where('user_id', $user_id);
            })
                ->with(['variant.article'])
                ->get()
                ->map(function ($detail) {
                    return [
                        'id' => $detail->id,
                        'cantidad' => $detail->cantidad,
                        'precio'   => $detail->precio,
                        'article'  => [
                            'id'     => $detail->variant->article->id ?? null,
                            'nombre' => $detail->variant->article->nombre ?? null,
                            'imagen' => $detail->variant->article->imagen ?? null,
                            'precio' => $detail->variant->article->precioVenta ?? null,
                        ]
                    ];
                });

            return response()->json($sales);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al procesar la solicitud para obtener las ventas',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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
    public function show(Sale_detail $sale_detail)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Sale_detail $sale_detail)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Sale_detail $sale_detail)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sale_detail $sale_detail)
    {
        //
    }
}

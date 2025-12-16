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
            $sales = Sale::where('user_id', $user_id)
                ->with(['details.variant.article'])
                ->orderByDesc('fecha')
                ->get()
                ->map(function ($sale) {
                    return [
                        'sale_id' => $sale->id,
                        'fecha'   => $sale->fecha,
                        'total'   => $sale->details->sum(fn($d) => $d->cantidad * $d->precio),
                        'items' => $sale->details->map(fn($d) => [
                            'cantidad'  => $d->cantidad,
                            'precio'   => intval($d->precio),
                            'subtotal' => $d->cantidad * $d->precio,
                            'variant' => [
                                'id'    => $d->variant->id,
                                'color' => $d->variant->color->nombre ?? null,
                                'size'  => $d->variant->size->nombre ?? null,
                            ],
                            'article' => [
                                'id'     => $d->variant->article->id,
                                'nombre' => $d->variant->article->nombre,
                                'imagen' => $d->variant->article->imagen
                            ]
                        ])
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

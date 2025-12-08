<?php

namespace App\Http\Controllers;

use App\Models\Purchase;
use App\Models\Purchase_detail;
use App\Models\Variant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use function Symfony\Component\Clock\now;

class PurchaseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $purchases = Purchase_detail::with([
            'variant.article',
            'variant.color',
            'variant.size'
        ])->get();

        $purchasesFormated = $purchases->map(function ($purchase) {
            return [
                'id' => $purchase['id'],
                'cantidad' => $purchase['cantidad'],
                'variant' => [
                    'color' => $purchase['variant']->color ? [
                        'nombre' => $purchase['variant']->color->nombre
                    ] : null,
                    'size' => $purchase['variant']->size ? [
                        'nombre' => $purchase['variant']->size->nombre
                    ] : null,
                    'article' => [
                        'nombre' => $purchase['variant']->article->nombre
                    ]
                ]
            ];
        });

        return response()->json($purchasesFormated);
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
        try {
            $validator = Validator::make(
                $request->all(),
                [
                    'supplier_id' => 'required|exists:suppliers,id',
                    'variants' => 'required|array',
                    'variants.*.id' => 'required|exists:variants,id',
                    'variants.*.cantidad' => 'required|integer',
                ]
            );
            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Datos de validacion invalidos',
                    'error' => $validator->errors()
                ]);
            }
            $data = $validator->validated();
            $data['fecha'] = now();
            $purchase = Purchase::create($data);
            $pivotData = [];
            foreach ($data['variants'] as $item) {
                $pivotData[$item['id']] = [
                    'cantidad' => $item['cantidad']
                ];
            }
            
            $purchase->variants()->sync($pivotData);

            foreach ($data['variants'] as $item) {
                Variant::where('id', $item['id'])
                    ->increment('stock', $item['cantidad']);
            }

            return response()->json($purchase, 201);
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
    public function show(Purchase $purchase)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Purchase $purchase)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Purchase $purchase)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Purchase $purchase)
    {
        //
    }
}

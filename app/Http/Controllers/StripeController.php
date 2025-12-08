<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\Sale;
use App\Models\Sale_detail;
use App\Models\Variant;
use Illuminate\Http\Request;
use Stripe\Checkout\Session;
use Stripe\Stripe;
use Tymon\JWTAuth\Facades\JWTAuth;

use function Symfony\Component\Clock\now;

class StripeController extends Controller
{
     public function createSession(Request $request)
    {
        try {
            Stripe::setApiKey(env("STRIPE_SECRET_KEY"));

            $user = JWTAuth::parseToken()->authenticate();
            $items = $request->items;
            $subtotal = collect($items)->sum(fn($i) => $i['precio'] * $i['cantidad']);
            $despacho = $subtotal < 300 ? $subtotal * 0.10 : 0;
            $total = $subtotal + $despacho;

            $venta = Sale::create([
                'fecha' => now(),
                'user_id' => $user->id,
                'address_id' => $request->address_id,
                'total' => $total,
                'estado' => 'pendiente',
            ]);

            foreach ($items as $item) {
                Sale_detail::create([
                    'sale_id' => $venta->id,
                    'variant_id' => $item['variant_id'],
                    'cantidad' => $item['cantidad'],
                    'precio' => $item['precio'],
                    'descuento' => 0,
                ]);
            }

            $pago = Payment::create([
                'sale_id' => $venta->id,
                'metodo' => 'tarjeta',
                'monto' => $total,
                'fecha' => now(),
                'estado' => 'pendiente',
            ]);

            $lineItems = collect($items)->map(function ($item) {
                return [
                    'price_data' => [
                        'currency' => 'pen',
                        'product_data' => [
                            'name' => $item['name'],
                        ],
                        'unit_amount' => intval($item['precio'] * 100),
                    ],
                    'quantity' => $item['cantidad'],
                ];
            })->toArray();

            if ($despacho > 0) {
                $lineItems[] = [
                    'price_data' => [
                        'currency' => 'pen',
                        'product_data' => ['name' => 'Costo de despacho'],
                        'unit_amount' => intval($despacho * 100),
                    ],
                    'quantity' => 1,
                ];
            }

            $session = Session::create([
                'payment_method_types' => ['card'],
                'mode' => 'payment',
                'line_items' => $lineItems,
                'success_url' => 'http://localhost:5173/success',
                'cancel_url' => 'http://localhost:5173/cancel',
                'metadata' => [
                    'ventaId' => $venta->id,
                    'pagoId' => $pago->id,
                ],
            ]);

            return response()->json($session);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
    public function webhook(Request $request)
    {
        $endpointSecret = env('STRIPE_WEBHOOK_SECRET');
        $sig = $request->header('stripe-signature');

        try {
            $event = \Stripe\Webhook::constructEvent(
                $request->getContent(),
                $sig,
                $endpointSecret
            );
        } catch (\Exception $e) {
            return response("Webhook Error: " . $e->getMessage(), 400);
        }

        if ($event->type === "checkout.session.completed") {
            $session = $event->data->object;

            $ventaId = $session->metadata->ventaId ?? null;
            $pagoId = $session->metadata->pagoId ?? null;

            if ($ventaId && $pagoId) {
                Sale::where('id', $ventaId)->update(['estado' => 'pagado']);
                Payment::where('id', $pagoId)->update(['estado' => 'completado']);
            }

            $detalles = Sale_detail::where('sale_id', $ventaId)
                ->with('variant')
                ->get();

            foreach ($detalles as $detalle) {
                Variant::where('id', $detalle->variant_id)->decrement('stock', $detalle->cantidad);
            }
        }

        return response("OK", 200);
    }
}

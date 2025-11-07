"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhook = exports.createSession = void 0;
const stripe_1 = __importDefault(require("stripe"));
const prisma_1 = require("../lib/prisma");
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-10-29.clover",
});
const createSession = async (req, res) => {
    try {
        const userId = req.user.id;
        const { direccionId, items } = req.body;
        const subtotal = items.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
        const despacho = subtotal < 300 ? subtotal * 0.10 : 0;
        const total = subtotal + despacho;
        const venta = await prisma_1.prisma.venta.create({
            data: {
                usuarioId: Number(userId),
                direccionId,
                total,
                estado: "pendiente",
            },
        });
        await prisma_1.prisma.detalleVenta.createMany({
            data: items.map((item) => ({
                ventaId: venta.idVenta,
                varianteId: item.varianteId,
                cantidad: item.cantidad,
                precio: item.precio,
                descuento: 0,
            })),
        });
        const pago = await prisma_1.prisma.pago.create({
            data: {
                ventaId: venta.idVenta,
                metodo: "tarjeta",
                monto: total,
                estado: "pendiente",
            },
        });
        const lineItems = items.map((item) => ({
            price_data: {
                currency: "pen",
                product_data: {
                    name: item.name,
                },
                unit_amount: Math.round(item.precio * 100),
            },
            quantity: item.cantidad,
        }));
        if (despacho > 0) {
            lineItems.push({
                price_data: {
                    currency: "pen",
                    product_data: { name: "Costo de despacho" },
                    unit_amount: Math.round(despacho * 100),
                },
                quantity: 1,
            });
        }
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: lineItems,
            success_url: "http://localhost:5173/success",
            cancel_url: "http://localhost:5173/cancel",
            metadata: {
                ventaId: venta.idVenta.toString(),
                pagoId: pago.idPago.toString(),
            },
        });
        res.json(session);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.createSession = createSession;
const webhook = async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;
    try {
        const payload = req.rawBody || req.body;
        event = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET);
    }
    catch (err) {
        console.error("⚠️ Webhook error:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const ventaId = parseInt(session.metadata?.ventaId || "0");
        const pagoId = parseInt(session.metadata?.pagoId || "0");
        if (ventaId && pagoId) {
            await prisma_1.prisma.venta.update({
                where: { idVenta: ventaId },
                data: { estado: "pagado" },
            });
            await prisma_1.prisma.pago.update({
                where: { idPago: pagoId },
                data: { estado: "completado" },
            });
        }
        const detalles = await prisma_1.prisma.detalleVenta.findMany({
            where: { ventaId },
            include: { variante: true },
        });
        for (const detalle of detalles) {
            await prisma_1.prisma.variante.update({
                where: { idVariante: detalle.varianteId },
                data: {
                    stock: {
                        decrement: detalle.cantidad,
                    },
                },
            });
        }
        console.log(`Stock actualizado para venta ${ventaId}`);
    }
    res.status(200).send("OK");
};
exports.webhook = webhook;
//# sourceMappingURL=stripeController.js.map
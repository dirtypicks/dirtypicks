"use client";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
    const params = useSearchParams();
    const orderId = params.get("orderId");
    return (
        <div style={{ textAlign: "center", marginTop: "80px" }}>
            <h1>✅ Pago completado</h1>
            <h2>✅ Tu número de orden: {orderId}</h2>
            <p>Gracias por tu compra. Revisa tu correo para más detalles.</p>
        </div>
    );
}

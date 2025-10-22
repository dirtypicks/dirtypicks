"use client";

import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { showToast } from "../utils/general";
import { HOST_FRONT } from "../utils/api";

export default function CheckoutForm(props: { orderId: string }) {
    const {orderId} = props;
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setLoading(true);
        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${HOST_FRONT}/payment/success?orderId=${orderId}`, // 👈 tu página de confirmación
            },
        });
        if (error) showToast(error.message || "Error al procesar pago", "error");
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <button disabled={loading || !stripe}>
                {loading ? "Procesando..." : "Pagar ahora"}
            </button>
        </form>
    );
}

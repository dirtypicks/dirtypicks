"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { api } from "../utils/api";
import CheckoutForm from "./CheckoutForm";
import { Spinner } from "../components/Spinner";

export default function PaymentPage() {
    const params = useSearchParams();
    const clientSecret = params.get("client_secret");
    const publishableKey = params.get("pk");
    const orderId = params.get("order")!;
    const [stripePromise, setStripePromise] = useState<any>(null);

    useEffect(() => {
        if (publishableKey) {
            setStripePromise(loadStripe(publishableKey));
        }
    }, [publishableKey]);

    if (!clientSecret || !stripePromise) return <Spinner message="Cargando pago..."></Spinner>;

    return (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm orderId={orderId}/>
        </Elements>
    );
}

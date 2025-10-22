"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { api } from "../../utils/api";
import CheckoutForm from "./CheckoutForm";
import { Spinner } from "../../components/Spinner";

export default function PaymentPage(props: { clientSecret: string, publishableKey: string }) {
    const { clientSecret, publishableKey } = props;
    //const orderId = params.get("order")!;
    const [stripePromise, setStripePromise] = useState<any>(null);

    useEffect(() => {
        if (publishableKey) {
            setStripePromise(loadStripe(publishableKey));
        }
    }, [publishableKey]);

    if (!clientSecret || !stripePromise) return <Spinner message="Cargando pago..."></Spinner>;

    return (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm orderId={""} />
        </Elements>
    );
}

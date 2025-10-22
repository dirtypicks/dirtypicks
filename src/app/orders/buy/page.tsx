// src/app/order/[id]/page.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createOrder, getPickById } from "../../utils/api";
import { useAuthStore } from "../../store/auth";
import styles from "../../styles/BuyPick.module.css";
import Link from "next/link";
import { showToast } from "@/app/utils/general";
import StripeForm from "./StripeForm";

export default function BuyPickPage() {
  const params = useSearchParams();
  const id = params.get("id");
  const router = useRouter();
  const { token } = useAuthStore();

  const [pick, setPick] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [loadingPick, setLoadingPick] = useState(true);
  const [stripeData, setStripeData] = useState<{publishableKey:string, clientSecret: string}>();

  useEffect(() => {
    const fetchPick = async () => {
      const data = await getPickById(String(id));
      setPick(data);
      setLoadingPick(false);
    };
    fetchPick();
  }, [id]);

  const handleBuy = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!token && !email) return showToast("Ingresa tu correo para continuar", "warning");
      const data = await createOrder(pick.id, email);
      console.log(data)
      if (data.ok) {
        setStripeData(data);
        //router.push(`/payment?${params.toString()}`);
      } else {
        showToast(`Error al generar la orden: ${data.msg}`, "error");
      }
    } catch(err) {
      console.log(err)
      showToast("Error al generar la orden", "error");
    }
  };

  if (loadingPick) return <p>Cargando pick...</p>;
  if (!pick) return <p>Pick no encontrado.</p>;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>{pick.event}</h1>
        <p className={styles.sport}>{pick.sport}</p>
        <p className={styles.description}>{pick.description}</p>
        <span className={styles.price}>${pick.price.toFixed(2)}</span>

        {!token && (
          <input
            type="email"
            placeholder="Email"
            value={email}
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
        )}

        {!stripeData ? <>
          <button onClick={handleBuy} className={styles.buyBtn}>
            Continuar compra
          </button>

          {!token && <Link className={styles.link} href="/register">
            ¿No tienes cuenta? Regístrate
          </Link>}
        </> : <StripeForm clientSecret={stripeData.clientSecret} publishableKey={stripeData.publishableKey}/>}

      </div>
    </div>
  );
}

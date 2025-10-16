// src/app/order/[id]/page.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createOrder, getPickById } from "../../utils/api";
import { useAuthStore } from "../../store/auth";
import styles from "../../styles/BuyPick.module.css";
import Link from "next/link";
import { showToast } from "@/app/utils/general";

export default function BuyPickPage() {
  const params = useSearchParams();
  const id = params.get("id");
  const router = useRouter();
  const { token } = useAuthStore();

  const [pick, setPick] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPick = async () => {
      const data = await getPickById(String(id));
      setPick(data);
      setLoading(false);
    };
    fetchPick();
  }, [id]);

  const handleBuy = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!token && !email) return alert("Ingresa tu correo para continuar");
      const data = await createOrder(pick.id, email);
      if(data.ok){
        showToast("Se ha generado correctamente tu orden. Revisa tu correo", "success")
        setEmail("");
      }else{
        showToast("Error al generar la orden", "error")
      }
      //setTimeout(() => router.push("/"), 1500);
    } catch {
      alert("Error al crear la orden");
    }
  };

  if (loading) return <p>Cargando pick...</p>;
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

        <button onClick={handleBuy} className={styles.buyBtn}>
          Confirmar compra
        </button>

        {!token && <Link className={styles.link} href="/register">
          ¿No tienes cuenta? Regístrate
        </Link>}

      </div>
    </div>
  );
}

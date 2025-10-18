"use client";

import { useState } from "react";
import styles from "../styles/auth.module.css";
import { requestPasswordReset } from "../utils/api";
import Link from "next/link";
import { showToast } from '../utils/general';
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await requestPasswordReset(email);
    setMsg(res?.msg || "Se ha enviado un correo con instrucciones.");
    showToast(res?.msg || "Se ha enviado un correo con instrucciones.");
    setTimeout(()=>router.push("/login"),1000);
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h1 className={styles.title}>Recuperar contraseña</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="email"
            placeholder="Correo electrónico"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />
          <button type="submit" className={styles.button}>
            Enviar correo
          </button>
        </form>
        {msg && <p className={styles.success}>{msg}</p>}
        <Link href="/login" className={styles.link}>
          Volver al inicio de sesión
        </Link>
      </div>
    </div>
  );
}

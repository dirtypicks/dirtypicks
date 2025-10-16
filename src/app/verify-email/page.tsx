"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "../../styles/auth.module.css";
import { verifyEmail } from "../utils/api";
import Link from "next/link";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [msg, setMsg] = useState("Verificando correo...");

  useEffect(() => {
    if (token) {
      verifyEmail(token).then((res) =>
        setMsg(res?.msg || "Correo verificado correctamente.")
      );
    } else {
      setMsg("Token no válido.");
    }
  }, [token]);

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h1 className={styles.title}>Verificar correo</h1>
        <p className={styles.success}>{msg}</p>
        <Link href="/login" className={styles.link}>
          Volver al inicio de sesión
        </Link>
      </div>
    </div>
  );
}

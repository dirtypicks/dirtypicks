"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../styles/auth.module.css";
import { loginUser } from "../utils/api";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await loginUser({ email, password });
    if (res?.token) {
      sessionStorage.setItem("token", res.token);
      router.push("/");
    } else {
      setError(res?.msg || "Error al iniciar sesión");
    }
  };

  return (<div className={styles.authContainer}>
    <div className={styles.authCard}>
      <h1 className={styles.title}>Iniciar sesión</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Entrar
        </button>
      </form>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.linkGroup}>
        <Link className={styles.link} href="/register">
          ¿No tienes cuenta? Regístrate
        </Link>
        <Link className={styles.link} href="/forgot-password">
          ¿Olvidaste tu contraseña?
        </Link>
      </div>
    </div>
  </div>
  );
}

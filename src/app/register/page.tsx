"use client";

import { useState } from "react";
import styles from "../../styles/auth.module.css";
import { useRouter } from "next/navigation";
import { registerUser } from "../utils/api";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await registerUser({name, email, password}) ;
    if (res?.msg) {
      setMsg(res.msg);
      setTimeout(() => router.push("/login"), 2000);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h1 className={styles.title}>Registrarse</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            placeholder="Nombre de usuario"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
            required
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
          <button type="submit" className={styles.button}>
            Crear cuenta
          </button>
        </form>
        {msg && <p className={styles.success}>{msg}</p>}
        <p className={styles.linkGroup}>
          <Link href="/login" className={styles.link}>
            ¿Ya tienes cuenta? Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}

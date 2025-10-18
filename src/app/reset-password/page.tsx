"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import styles from "../styles/auth.module.css";
import { resetPassword } from "../utils/api";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (token) {
      const res = await resetPassword(token, newPassword);
      setMsg(res?.msg || "Contraseña reestablecida correctamente");
      setTimeout(() => router.push("/login"), 1000);
    } else {
      setMsg("Token no válido.");
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h2 className={styles.title}>Reestablecer contraseña</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="password"
            placeholder="Nueva contraseña"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button type="submit" className={styles.button}>Reestablecer</button>
        </form>
        {msg && <p className={styles.success}>{msg}</p>}
      </div>
    </div>
  );
}

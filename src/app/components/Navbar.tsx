"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../styles/Navbar.module.css";
import { useAuthStore } from "../store/auth";
import Link from "next/link";

export default function Navbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("dark");
  const { token, role, logout } = useAuthStore();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.navbarContent}>
        <Link className={styles.logo} href="/" onClick={closeMenu}>
          DirtyPicks
        </Link>

        <div className={styles.actions}>
          <button onClick={toggleTheme} className={styles.themeToggle}>
            {theme === "dark" ? "🌞" : "🌙"}
          </button>
          <button
            className={styles.menuButton}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
          >
            ☰
          </button>
        </div>

        <nav className={`${styles.navLinks} ${menuOpen ? styles.active : ""}`}>
          <Link onClick={closeMenu} href="/" className={styles.link}>
            Inicio
          </Link>
          {!token && (
            <>
              <Link onClick={closeMenu} href="/login" className={styles.link}>
                Login
              </Link>
              <Link onClick={closeMenu} href="/register" className={styles.link}>
                Register
              </Link>
            </>
          )}

          {token && role === "user" && (
            <>
              <Link onClick={closeMenu} href="/orders" className={styles.link}>
                Mis Compras
              </Link>
              <Link href="/" onClick={logout} className={styles.logout}>
                Cerrar sesión
              </Link>
            </>
          )}

          {token && role === "admin" && (
            <>
              <Link
                onClick={closeMenu}
                href="/admin/create-pick"
                className={styles.link}
              >
                Crear Pick
              </Link>
              <Link onClick={closeMenu} href="/orders" className={styles.link}>
                Ver Órdenes
              </Link>
              <Link href="/" onClick={logout} className={styles.logout}>
                Cerrar sesión
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

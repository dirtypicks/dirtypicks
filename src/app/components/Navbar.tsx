"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../styles/Navbar.module.css";
import { getToken, getUserRole, removeToken } from "../utils/auth";

export default function Navbar() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("dark");

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

  useEffect(() => {
    const loadAuth = () => {
      setToken(getToken());
      setRole(getUserRole());
    };
    loadAuth();
    const listener = () => loadAuth();
    window.addEventListener("storage", listener);
    return () => window.removeEventListener("storage", listener);
  }, []);

  const handleLogout = () => {
    removeToken();
    setToken(null);
    setRole(null);
    router.push("/login");
  };

  const goTo = (path: string) => {
    router.push(path);
    setMenuOpen(false);
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.navbarContent}>
        <h1 className={styles.logo} onClick={() => goTo("/")}>
          DirtyPicks
        </h1>

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
          {!token && (
            <>
              <a onClick={() => goTo("/login")} className={styles.link}>
                Login
              </a>
              <a onClick={() => goTo("/register")} className={styles.link}>
                Register
              </a>
            </>
          )}

          {token && role === "user" && (
            <>
              <a onClick={() => goTo("/picks")} className={styles.link}>
                Ver Picks
              </a>
              <a onClick={() => goTo("/orders")} className={styles.link}>
                Mis Compras
              </a>
              <a onClick={handleLogout} className={styles.logout}>
                Cerrar sesión
              </a>
            </>
          )}

          {token && role === "admin" && (
            <>
              <button onClick={() => goTo("/picks")} className={styles.link}>
                Ver Picks
              </button>
              <button
                onClick={() => goTo("/admin/create-pick")}
                className={styles.link}
              >
                Crear Pick
              </button>
              <button onClick={() => goTo("/orders")} className={styles.link}>
                Ver Órdenes
              </button>
              <button onClick={handleLogout} className={styles.logout}>
                Cerrar sesión
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

"use client";
import { useEffect, useState } from "react";
import styles from "../styles/auth.module.css";
import { getAllPicks } from "./utils/api";

interface Pick {
  id: string;
  sport: string;
  league?: string;
  event: string;
  description?: string;
  price: number;
  url?: string;
}

export default function HomePage() {
  const [picks, setPicks] = useState<Pick[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllPicks().then((data) => {
      setPicks(data.picks);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Cargando picks...</p>;

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>DirtyPicks</h1>
      <h2 className={styles.subtitle}>Picks disponibles</h2>
      <div className={styles.cardList}>
        {picks.map((pick) => (
          <div key={pick.id} className={styles.card}>
            <h3>{pick.event}</h3>
            <p><strong>Deporte:</strong> {pick.sport}</p>
            <p>{pick.description}</p>
            <p><strong>Precio:</strong> ${pick.price}</p>
            {pick.url && <a href={pick.url} target="_blank">Ver más</a>}
          </div>
        ))}
      </div>
    </main>
  );
}

// src/app/picks/page.tsx
"use client";

import { useEffect, useState } from "react";
import { getAllPicks } from "./utils/api";
import PickCard from "./components/PickCard";
import styles from "./styles/Picks.module.css";
import { Spinner } from "./components/Spinner";

export default function PicksPage() {
  const [picks, setPicks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPicks = async () => {
      const data = await getAllPicks();
      setPicks(data.picks);
      setLoading(false);
    };
    loadPicks();
  }, []);

  if (loading) return <Spinner message="Cargando picks..."/>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Hacemos que el casino se equivoque, no tú</h1>
      <div className={styles.grid}>
        {picks?.map((pick) => (
          <PickCard key={pick.id} pick={pick} />
        ))}
      </div>
    </div>
  );
}

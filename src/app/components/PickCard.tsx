"use client";

import styles from "../styles/Picks.module.css";
import Link from "next/link";
import { Pick } from "../types.js";

interface PickCardProps {
  pick: Pick;
}

export default function PickCard({ pick }: PickCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.cardHeader}>
        {pick.league && <span className={styles.leagueTag}>{pick.league}</span>}
        <h3 className={styles.event}>{pick.event}</h3>
      </div>

      <p className={styles.description}>
        {pick.description || "Predicción detallada de nuestros expertos deportivos."}
      </p>

      <div className={styles.cardFooter}>
        <span className={styles.price}>${pick.price.toFixed(2)}</span>
        <Link
          className={styles.buyButton}
          href={`/orders/buy?id=${pick.id}`}
        >
          Comprar
        </Link>
      </div>
    </article>
  );
}

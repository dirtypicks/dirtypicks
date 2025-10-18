"use client";

import React, { useState } from "react";
import { createPick } from "../../utils/api";
import { FaPlus } from "react-icons/fa";
import styles from "../../styles/CreatePick.module.css";
import { showToast } from "@/app/utils/general";


export default function CreatePickPage() {
  const [form, setForm] = useState({
    sport: "",
    league: "",
    event: "",
    description: "",
    price: "",
    fullPick: "",
    url: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await createPick({
        ...form,
        price: parseFloat(form.price)
      });

      if (res.ok) {
        showToast("Pick creado correctamente","success");
        setForm({
          sport: "",
          league: "",
          event: "",
          description: "",
          price: "",
          fullPick: "",
          url: ""
        });
      }
    } catch (error: any) {
      showToast(error.response?.data?.msg || "Error al crear pick","error");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Crear nuevo Pick</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.group}>
          <label>Deporte</label>
          <input
            type="text"
            name="sport"
            placeholder="Ej. Fútbol"
            value={form.sport}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.group}>
          <label>Liga</label>
          <input
            type="text"
            name="league"
            placeholder="Ej. La Liga"
            value={form.league}
            onChange={handleChange}
          />
        </div>

        <div className={styles.group}>
          <label>Evento</label>
          <input
            type="text"
            name="event"
            placeholder="Ej. Real Madrid vs Barcelona"
            value={form.event}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.group}>
          <label>Descripción</label>
          <textarea
            name="description"
            placeholder="Detalles del pick..."
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div className={styles.group}>
          <label>Precio</label>
          <input
            type="number"
            name="price"
            step="0.01"
            placeholder="Ej. 50"
            value={form.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.group}>
          <label>Full Pick</label>
          <textarea
            name="fullPick"
            placeholder="Texto completo del pick"
            value={form.fullPick}
            onChange={handleChange}
          />
        </div>

        <div className={styles.group}>
          <label>URL (opcional)</label>
          <input
            type="text"
            name="url"
            placeholder="https://..."
            value={form.url}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className={styles.btn}>
          <FaPlus /> Crear Pick
        </button>
      </form>
    </div>
  );
}


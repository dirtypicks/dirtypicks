"use client";

import React, { useState } from "react";
import { createPick } from "../../utils/api";
import { FaPlus, FaSmile } from "react-icons/fa";
import styles from "../../styles/CreatePick.module.css";
import { showToast } from "@/app/utils/general";
import dynamic from "next/dynamic";

// Import dinámico para evitar problemas con SSR
const EmojiPicker = dynamic(() => import("emoji-picker-react"), { ssr: false });

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

  const [showPicker, setShowPicker] = useState<{ [key: string]: boolean }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleEmojiClick = (field: string, emojiObject: any) => {
    setForm(prev => ({
      ...prev,
      [field]: prev[field as keyof typeof prev] + emojiObject.emoji
    }));
  };

  const togglePicker = (field: string) => {
    setShowPicker(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await createPick({
        ...form,
        price: parseFloat(form.price)
      });

      if (res.ok) {
        showToast("Pick creado correctamente", "success");
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
      showToast(error.response?.data?.msg || "Error al crear pick", "error");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Crear nuevo Pick</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        {["sport", "league", "event", "description", "fullPick"].map(field => (
          <div className={styles.group} key={field}>
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            {field === "description" || field === "fullPick" ? (
              <textarea
                name={field}
                placeholder={`Escribe ${field}...`}
                value={form[field as keyof typeof form]}
                onChange={handleChange}
              />
            ) : (
              <input
                type="text"
                name={field}
                placeholder={`Escribe ${field}...`}
                value={form[field as keyof typeof form]}
                onChange={handleChange}
              />
            )}

            <button
              type="button"
              onClick={() => togglePicker(field)}
              className={styles.emojiBtn}
            >
              <FaSmile />
            </button>

            {showPicker[field] && (
              <EmojiPicker
                onEmojiClick={emoji => handleEmojiClick(field, emoji)}
              />
            )}
          </div>
        ))}

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

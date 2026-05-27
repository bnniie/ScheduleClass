import React, { useState } from "react";
import axios from "axios";
import styles from "../../styles/Dashboard.module.css";

const AulaForm: React.FC = () => {
  const [form, setForm] = useState({
    nombre: "",
    capacidad: 0,
    computadores: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      nombre: form.nombre,
      capacidad: Number(form.capacidad),
      computadores: form.computadores,
    };
    try {
      await axios.post("http://localhost:8080/api/aulas", payload);
      alert("Aula registrada exitosamente");
      setForm({ nombre: "", capacidad: 0, computadores: false });
    } catch (error) {
      alert("Error al registrar aula");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.main}>
      {/* Nombre */}
      <div>
        <label>Nombre del Aula</label>
        <input
          type="text"
          name="nombre"
          placeholder="Ej: Aula 101"
          value={form.nombre}
          onChange={handleChange}
          className={styles.inputText}
          required
        />
      </div>

      {/* Capacidad */}
      <div>
        <label>Capacidad</label>
        <input
          type="number"
          name="capacidad"
          placeholder="Ej: 30"
          value={form.capacidad}
          onChange={handleChange}
          className={styles.inputText}
          required
        />
      </div>

      {/* Computadores */}
      <div>
        <label>
          <input
            type="checkbox"
            name="computadores"
            checked={form.computadores}
            onChange={handleChange}
          />
          Aula con computadores
        </label>
      </div>

      {/* Botón debajo */}
      <div>
        <button type="submit" className={styles.button}>
          Guardar
        </button>
      </div>
    </form>
  );
};

export default AulaForm;
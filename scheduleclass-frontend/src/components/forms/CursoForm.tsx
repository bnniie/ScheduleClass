import React, { useState } from "react";
import { createCurso } from "../../services/cursoService";
import styles from "../../styles/Dashboard.module.css";

const CursoForm: React.FC = () => {
  const [form, setForm] = useState({
    nombre: "",
    sesionesPorSemana: 1,
    capacidadMaxima: 0,
    capacidadMinima: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      nombre: form.nombre,
      sesionesPorSemana: Number(form.sesionesPorSemana),
      capacidadMaxima: Number(form.capacidadMaxima),
      capacidadMinima: Number(form.capacidadMinima),
    };
    try {
      await createCurso(payload);
      alert("Curso creado");
      setForm({ nombre: "", sesionesPorSemana: 1, capacidadMaxima: 0, capacidadMinima: 0 });
    } catch (error) {
      alert("Error al crear curso");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.main}>
      <div>
        <label>Nombre del Curso</label>
        <input
          type="text"
          name="nombre"
          placeholder="Ej: Matemáticas"
          value={form.nombre}
          onChange={handleChange}
          className={styles.inputText}
          required
        />
      </div>

      <div>
        <label>Sesiones por semana</label>
        <input
          type="number"
          name="sesionesPorSemana"
          placeholder="Ej: 3"
          value={form.sesionesPorSemana}
          onChange={handleChange}
          className={styles.inputText}
          required
        />
      </div>

      <div>
        <label>Capacidad máxima</label>
        <input
          type="number"
          name="capacidadMaxima"
          placeholder="Ej: 40"
          value={form.capacidadMaxima}
          onChange={handleChange}
          className={styles.inputText}
          required
        />
      </div>

      <div>
        <label>Capacidad mínima</label>
        <input
          type="number"
          name="capacidadMinima"
          placeholder="Ej: 10"
          value={form.capacidadMinima}
          onChange={handleChange}
          className={styles.inputText}
          required
        />
      </div>

      <div>
        <button type="submit" className={styles.button}>
          Guardar
        </button>
      </div>
    </form>
  );
};

export default CursoForm;
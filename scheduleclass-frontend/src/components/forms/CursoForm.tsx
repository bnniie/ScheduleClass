import React, { useState } from "react";
import { createCurso } from "../../services/cursoService";

const CursoForm: React.FC = () => {
  const [form, setForm] = useState({ nombre: "", sesionesPorSemana: 1, capacidadMaxima: 0, capacidadMinima: 0 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createCurso(form);
    alert("Curso creado");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} />
      <input name="sesionesPorSemana" type="number" placeholder="Sesiones por semana" value={form.sesionesPorSemana} onChange={handleChange} />
      <input name="capacidadMaxima" type="number" placeholder="Capacidad máxima" value={form.capacidadMaxima} onChange={handleChange} />
      <input name="capacidadMinima" type="number" placeholder="Capacidad mínima" value={form.capacidadMinima} onChange={handleChange} />
      <button type="submit">Guardar</button>
    </form>
  );
};

export default CursoForm;

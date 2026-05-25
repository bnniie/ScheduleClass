import React, { useState } from "react";
import { createDocente } from "../../services/docenteService";

const DocenteForm: React.FC = () => {
  const [form, setForm] = useState({ nombre: "", dedicacion: "", restricciones: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createDocente(form);
    alert("Docente creado");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} />
      <input name="dedicacion" placeholder="Dedicación" value={form.dedicacion} onChange={handleChange} />
      <input name="restricciones" placeholder="Restricciones" value={form.restricciones} onChange={handleChange} />
      <button type="submit">Guardar</button>
    </form>
  );
};

export default DocenteForm;
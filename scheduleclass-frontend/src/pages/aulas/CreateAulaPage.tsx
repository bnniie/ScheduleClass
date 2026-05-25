import React, { useState } from "react";
import axios from "axios";

const CreateAulaPage: React.FC = () => {
  const [form, setForm] = useState({ nombre: "", capacidad: 0, computadores: false, sillasMoviles: false });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/api/aulas", form);
    alert("Aula creada");
  };

  return (
    <div>
      <h2>Registrar Aula</h2>
      <form onSubmit={handleSubmit}>
        <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} />
        <input name="capacidad" type="number" placeholder="Capacidad" value={form.capacidad} onChange={handleChange} />
        <label>
          <input type="checkbox" name="computadores" checked={form.computadores} onChange={handleChange} />
          Aula con computadores
        </label>
        <label>
          <input type="checkbox" name="sillasMoviles" checked={form.sillasMoviles} onChange={handleChange} />
          Sillas móviles
        </label>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default CreateAulaPage;
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../styles/Dashboard.module.css";

const HorarioForm: React.FC = () => {
  const [docentes, setDocentes] = useState<any[]>([]);
  const [cursos, setCursos] = useState<any[]>([]);
  const [aulas, setAulas] = useState<any[]>([]);
  const [form, setForm] = useState({
    docenteId: "",
    cursoId: "",
    aulaId: "",
    inicio: "",
    fin: ""
  });

  useEffect(() => {
    axios.get("http://localhost:8080/api/docentes").then(res => setDocentes(res.data));
    axios.get("http://localhost:8080/api/cursos").then(res => setCursos(res.data));
    axios.get("http://localhost:8080/api/aulas").then(res => setAulas(res.data));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      docente: { id: Number(form.docenteId) },
      curso: { id: Number(form.cursoId) },
      aula: { id: Number(form.aulaId) },
      inicio: form.inicio,
      fin: form.fin
    };
    try {
      await axios.post("http://localhost:8080/api/horarios", payload);
      alert("Horario creado");
      setForm({ docenteId: "", cursoId: "", aulaId: "", inicio: "", fin: "" });
    } catch (error: any) {
      alert("Error al crear horario: " + error.response?.data?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.main}>
      <div>
        <label>Docente</label>
        <select
            name="docenteId"
            value={form.docenteId}
            onChange={handleChange}
            className={styles.selectBox}
            required
        >
            <option value="">Seleccione docente</option>
            {docentes.map(d => (
            <option key={d.id} value={d.id}>
                {d.usuario?.username}
            </option>
            ))}
        </select>
        </div>

      <div>
        <label>Curso</label>
        <select name="cursoId" value={form.cursoId} onChange={handleChange} className={styles.selectBox}>
          <option value="">Seleccione curso</option>
          {cursos.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
        </select>
      </div>

      <div>
        <label>Aula</label>
        <select name="aulaId" value={form.aulaId} onChange={handleChange} className={styles.selectBox}>
          <option value="">Seleccione aula</option>
          {aulas.map(a => <option key={a.id} value={a.id}>{a.nombre}</option>)}
        </select>
      </div>

      <div>
        <label>Inicio</label>
        <input type="datetime-local" name="inicio" value={form.inicio} onChange={handleChange} className={styles.inputText} />
      </div>

      <div>
        <label>Fin</label>
        <input type="datetime-local" name="fin" value={form.fin} onChange={handleChange} className={styles.inputText} />
      </div>

      <div>
        <button type="submit" className={styles.button}>Guardar</button>
      </div>
    </form>
  );
};

export default HorarioForm;
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../styles/Dashboard.module.css";

interface DocenteDTO {
  id: number;
  username: string;
  dedicacion: string;
  restricciones: string;
  disponibilidad: string;
  state: boolean;
}

interface Curso {
  id: number;
  nombre: string;
  sesionesPorSemana: number;
}

interface Aula {
  id: number;
  nombre: string;
}

const HorarioForm: React.FC = () => {
  const [docentes, setDocentes] = useState<DocenteDTO[]>([]);
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [aulas, setAulas] = useState<Aula[]>([]);
  const [formBase, setFormBase] = useState({
    docenteId: "",
    cursoId: "",
    aulaId: ""
  });
  const [horarios, setHorarios] = useState<any[]>([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/docentes")
      .then(res => setDocentes(Array.isArray(res.data) ? res.data : []))
      .catch(err => {
        console.error("Error cargando docentes:", err);
        setDocentes([]);
      });

    axios.get("http://localhost:8080/api/cursos")
      .then(res => setCursos(Array.isArray(res.data) ? res.data : []))
      .catch(err => {
        console.error("Error cargando cursos:", err);
        setCursos([]);
      });

    axios.get("http://localhost:8080/api/aulas")
      .then(res => setAulas(Array.isArray(res.data) ? res.data : []))
      .catch(err => {
        console.error("Error cargando aulas:", err);
        setAulas([]);
      });
  }, []);

  const handleCursoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cursoId = e.target.value;
    setFormBase({ ...formBase, cursoId });
    const curso = cursos.find(c => c.id === Number(cursoId));

    if (curso) {
      const nuevosHorarios = Array.from({ length: curso.sesionesPorSemana }, () => ({
        diaSemana: "",
        horaInicio: "",
        horaFin: ""
      }));
      setHorarios(nuevosHorarios);
    } else {
      setHorarios([]);
    }
  };

  const handleHorarioChange = (index: number, field: string, value: string) => {
    const nuevos = [...horarios];
    nuevos[index][field] = value;
    setHorarios(nuevos);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = horarios.map(h => ({
      docente: { id: Number(formBase.docenteId) },
      curso: { id: Number(formBase.cursoId) },
      aula: { id: Number(formBase.aulaId) },
      diaSemana: h.diaSemana,
      horaInicio: h.horaInicio,
      horaFin: h.horaFin
    }));

    try {
      await axios.post("http://localhost:8080/api/horarios/lote", payload);
      alert("Horarios creados");
      setFormBase({ docenteId: "", cursoId: "", aulaId: "" });
      setHorarios([]);
    } catch (error: any) {
      alert("Error al crear horarios: " + (error.response?.data?.message || "Error desconocido"));
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.main}>
      <div>
        <label>Docente</label>
        <select
          name="docenteId"
          value={formBase.docenteId}
          onChange={(e) => setFormBase({ ...formBase, docenteId: e.target.value })}
          className={styles.selectBox}
          required
        >
          <option value="">Seleccione docente</option>
          {docentes.length > 0 ? (
            docentes.map(d => (
              <option key={d.id} value={d.id}>
                {d.username}
              </option>
            ))
          ) : (
            <option disabled>No hay docentes disponibles</option>
          )}
        </select>
      </div>

      <div>
        <label>Curso</label>
        <select
          name="cursoId"
          value={formBase.cursoId}
          onChange={handleCursoChange}
          className={styles.selectBox}
          required
        >
          <option value="">Seleccione curso</option>
          {cursos.length > 0 ? (
            cursos.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)
          ) : (
            <option disabled>No hay cursos disponibles</option>
          )}
        </select>
      </div>

      <div>
        <label>Aula</label>
        <select
          name="aulaId"
          value={formBase.aulaId}
          onChange={(e) => setFormBase({ ...formBase, aulaId: e.target.value })}
          className={styles.selectBox}
          required
        >
          <option value="">Seleccione aula</option>
          {aulas.length > 0 ? (
            aulas.map(a => <option key={a.id} value={a.id}>{a.nombre}</option>)
          ) : (
            <option disabled>No hay aulas disponibles</option>
          )}
        </select>
      </div>

      {horarios.map((h, i) => (
        <div key={i} className={styles.sessionBlock}>
          <h4>Sesión {i + 1}</h4>
          <label>Día</label>
          <select
            value={h.diaSemana}
            onChange={(e) => handleHorarioChange(i, "diaSemana", e.target.value)}
            className={styles.selectBox}
            required
          >
            <option value="">Seleccione día</option>
            <option value="Lunes">Lunes</option>
            <option value="Martes">Martes</option>
            <option value="Miércoles">Miércoles</option>
            <option value="Jueves">Jueves</option>
            <option value="Viernes">Viernes</option>
          </select>

          <label>Hora inicio</label>
          <input
            type="time"
            value={h.horaInicio}
            onChange={(e) => handleHorarioChange(i, "horaInicio", e.target.value)}
            className={styles.inputText}
            required
          />

          <label>Hora fin</label>
          <input
            type="time"
            value={h.horaFin}
            onChange={(e) => handleHorarioChange(i, "horaFin", e.target.value)}
            className={styles.inputText}
            required
          />
        </div>
      ))}

      <div>
        <button type="submit" className={styles.button}>Guardar</button>
      </div>
    </form>
  );
};

export default HorarioForm;
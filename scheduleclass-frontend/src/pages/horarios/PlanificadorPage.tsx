// Autor: Paula Guerrero
// Fecha: 27/05/26
// Descripción: Página React para la creación automatizada de horarios el sistema ScheduleClass.

import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../styles/Dashboard.module.css";

interface Horario {
  id: number;
  curso: string;
  docente: string;
  aula: string;
  diaSemana: string;
  horaInicio: string;
  horaFin: string;
}

const PlanificadorPage: React.FC = () => {
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [loading, setLoading] = useState(false);
  const [cursos, setCursos] = useState<any[]>([]);
  const [docentes, setDocentes] = useState<any[]>([]);
  const [aulas, setAulas] = useState<any[]>([]);

  // Cargar datos iniciales
  useEffect(() => {
    axios.get("http://localhost:8080/api/cursos").then(res => setCursos(res.data));
    axios.get("http://localhost:8080/api/docentes").then(res => setDocentes(res.data));
    axios.get("http://localhost:8080/api/aulas").then(res => setAulas(res.data));
  }, []);

  const generarHorarios = async () => {
    setLoading(true);
    try {
      // Enviar solo los IDs al backend
      await axios.post("http://localhost:8080/api/planificador", {
        cursos: cursos.map(c => c.id),
        docentes: docentes.map(d => d.id),
        aulas: aulas.map(a => a.id)
      });

      // Consulta los horarios generados
      const res = await axios.get("http://localhost:8080/api/horarios");
      setHorarios(res.data);

      alert("Horarios generados exitosamente");
    } catch (error: any) {
      alert("Error al generar horarios: " + (error.response?.data?.message || "Error desconocido"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Planificación Automática</h2>
      <button onClick={generarHorarios} disabled={loading} className={styles.button}>
        {loading ? "Generando..." : "Generar Horarios"}
      </button>

      <h3>Horarios Generados</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Curso</th>
            <th>Docente</th>
            <th>Aula</th>
            <th>Día</th>
            <th>Hora Inicio</th>
            <th>Hora Fin</th>
          </tr>
        </thead>
        <tbody>
          {horarios.map(h => (
            <tr key={h.id}>
              <td>{h.curso}</td>
              <td>{h.docente}</td>
              <td>{h.aula}</td>
              <td>{h.diaSemana}</td>
              <td>{h.horaInicio}</td>
              <td>{h.horaFin}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlanificadorPage;
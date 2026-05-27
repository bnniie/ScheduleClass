import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../styles/Dashboard.module.css";

interface Horario {
  id: number;
  docente: { usuario: { username: string } };
  curso: { nombre: string };
  aula: { nombre: string };
  inicio: string;
  fin: string;
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
      // Lanza la planificación automática enviando cursos, docentes y aulas
      await axios.post("http://localhost:8080/api/planificador", {
        cursos,
        docentes,
        aulas
      });

      // Consulta los horarios generados
      const res = await axios.get("http://localhost:8080/api/horarios");
      setHorarios(res.data);

      alert("Horarios generados exitosamente");
    } catch (error: any) {
      alert("Error al generar horarios ❌: " + error.response?.data?.message);
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
            <th>Inicio</th>
            <th>Fin</th>
          </tr>
        </thead>
        <tbody>
          {horarios.map(h => (
            <tr key={h.id}>
              <td>{h.curso?.nombre}</td>
              <td>{h.docente?.usuario?.username}</td>
              <td>{h.aula?.nombre}</td>
              <td>{new Date(h.inicio).toLocaleString()}</td>
              <td>{new Date(h.fin).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlanificadorPage;
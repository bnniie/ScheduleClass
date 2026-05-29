// Autor: Paula Guerrero
// Fecha: 29/05/26
// Descripción: Página React para mostrar los cursos asignados a un Docente en el sistema ScheduleClass.

import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../styles/Dashboard.module.css";

interface CursoHorarioDTO {
  id: number;
  nombre: string;
  codigo: string;
  dias: string[];
  horaInicio: string;
  horaFin: string;
  aulaNombre: string;
}

const CursosAsignadosPage: React.FC = () => {
  const [cursos, setCursos] = useState<CursoHorarioDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        if (username) {
          const res = await axios.get(
            `http://localhost:8080/api/docentes/username/${username}/cursos-horarios`
          );
          setCursos(res.data);
        }
      } catch (error) {
        console.error("Error al cargar cursos asignados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCursos();
  }, [username]);

  if (loading) {
    return <p>Cargando cursos asignados...</p>;
  }

  return (
    <div>
      <h2>Cursos Asignados</h2>
      {cursos.length === 0 ? (
        <p>No tienes cursos asignados actualmente.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Código</th>
              <th>Días</th>
              <th>Hora Inicio</th>
              <th>Hora Fin</th>
              <th>Aula</th>
            </tr>
          </thead>
          <tbody>
            {cursos.map((curso) => (
              <tr key={curso.id}>
                <td>{curso.nombre}</td>
                <td>{curso.codigo}</td>
                <td>{curso.dias.join(", ")}</td>
                <td>{curso.horaInicio}</td>
                <td>{curso.horaFin}</td>
                <td>{curso.aulaNombre}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CursosAsignadosPage;
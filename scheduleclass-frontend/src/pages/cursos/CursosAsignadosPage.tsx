import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../styles/Dashboard.module.css";

interface Curso {
  id: number;
  nombre: string;
  grupo: string;
  horario: string;
}

const CursosAsignadosPage: React.FC = () => {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/docente/cursos");
        setCursos(res.data);
      } catch (error) {
        console.error("Error al cargar cursos asignados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCursos();
  }, []);

  if (loading) {
    return <p>Cargando cursos asignados...</p>;
  }

  return (
    <div>
      <h2>Mis Cursos Asignados</h2>
      {cursos.length === 0 ? (
        <p>No tienes cursos asignados actualmente.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Grupo</th>
              <th>Horario</th>
            </tr>
          </thead>
          <tbody>
            {cursos.map((curso) => (
              <tr key={curso.id}>
                <td>{curso.nombre}</td>
                <td>{curso.grupo}</td>
                <td>{curso.horario}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CursosAsignadosPage;
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../styles/Dashboard.module.css";

interface Curso {
  id: number;
  nombre: string;
  docente: string;
  creditos: number;
}

const CursosInscritosPage: React.FC = () => {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/usuario/cursos");
        setCursos(res.data);
      } catch (error) {
        console.error("Error al cargar cursos inscritos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCursos();
  }, []);

  if (loading) {
    return <p>Cargando cursos...</p>;
  }

  return (
    <div>
      <h2>Mis Cursos Inscritos</h2>
      {cursos.length === 0 ? (
        <p>No tienes cursos inscritos actualmente.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Docente</th>
              <th>Créditos</th>
            </tr>
          </thead>
          <tbody>
            {cursos.map((curso) => (
              <tr key={curso.id}>
                <td>{curso.nombre}</td>
                <td>{curso.docente}</td>
                <td>{curso.creditos}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CursosInscritosPage;
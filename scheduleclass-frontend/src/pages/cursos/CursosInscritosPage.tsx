// Autor: Paula Guerrero
// Fecha: 28/05/26
// Descripción: Página React para mostrar los cursos inscritos por un Estudiante en el sistema ScheduleClass.

import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../styles/Dashboard.module.css";

interface CursoDTO {
  id: number;
  nombre: string;
  codigo: string;
  creditos: number;
}

const CursosInscritosPage: React.FC = () => {
  const [cursos, setCursos] = useState<CursoDTO[]>([]);
  const username = localStorage.getItem("username");

  // Cargar cursos inscritos al iniciar
  useEffect(() => {
    axios.get(`http://localhost:8080/api/users/username/${username}/cursos`)
      .then(res => setCursos(res.data))
      .catch(err => console.error("Error al cargar cursos inscritos", err));
  }, [username]);

  // Cancelar inscripción
  const handleEliminar = async (cursoId: number) => {
    try {
      const res = await axios.delete(
        `http://localhost:8080/api/users/username/${username}/cursos/${cursoId}`
      );
      alert(res.data.message); // el backend devuelve { message: "..." }
      // refrescar lista
      setCursos(prev => prev.filter(c => c.id !== cursoId));
    } catch (error: any) {
      const msg = error.response?.data?.message || "Error desconocido";
      alert("Error al eliminar curso: " + msg);
    }
  };

  return (
    <div>
      <h2>Cursos Inscritos</h2>
      {cursos.length === 0 ? (
        <p>No tienes cursos inscritos.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Código</th>
              <th>Créditos</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {cursos.map(c => (
              <tr key={c.id}>
                <td>{c.nombre}</td>
                <td>{c.codigo}</td>
                <td>{c.creditos}</td>
                <td>
                  <button
                    onClick={() => handleEliminar(c.id)}
                    className={styles.buttonDanger}
                  >
                    Cancelar inscripción
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CursosInscritosPage;
// Autor: Paula Guerrero
// Fecha: 27/05/26
// Descripción: Página React para listar los cursos creados en el sistema ScheduleClass.

import React, { useEffect, useState } from "react";
import { getCursos, deleteCurso } from "../../services/cursoService";
import styles from "../../styles/Dashboard.module.css";

interface Curso {
  id: number;
  nombre: string;
  codigo: string;
  creditos: number;
  sesionesPorSemana: number;
  capacidadMaxima: number;
  capacidadMinima: number;
}

const ListCursosPage: React.FC = () => {
  const [cursos, setCursos] = useState<Curso[]>([]);

  useEffect(() => {
    cargarCursos();
  }, []);

  const cargarCursos = async () => {
    const res = await getCursos();
    setCursos(res.data);
  };

  const eliminarCurso = async (id: number) => {
    try {
      await deleteCurso(id);
      alert("Curso eliminado");
      cargarCursos();
    } catch (error) {
      alert("Error al eliminar curso");
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Listado de Cursos</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Código</th>
            <th>Créditos</th>
            <th>Sesiones/semana</th>
            <th>Capacidad máxima</th>
            <th>Capacidad mínima</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cursos.map((c) => (
            <tr key={c.id}>
              <td>{c.nombre}</td>
              <td>{c.codigo}</td>
              <td>{c.creditos}</td>
              <td>{c.sesionesPorSemana}</td>
              <td>{c.capacidadMaxima}</td>
              <td>{c.capacidadMinima}</td>
              <td>
                <button
                  onClick={() => eliminarCurso(c.id)}
                  className={styles.buttonDanger}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListCursosPage;
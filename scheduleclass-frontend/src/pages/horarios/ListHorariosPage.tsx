// Autor: Paula Guerrero
// Fecha: 27/05/26
// Descripción: Página React para listar los horarios creados en el sistema ScheduleClass.

import React, { useEffect, useState } from "react";
import { getHorarios, deleteHorario } from "../../services/horarioService";
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

const ListHorariosPage: React.FC = () => {
  const [horarios, setHorarios] = useState<Horario[]>([]);

  useEffect(() => {
    cargarHorarios();
  }, []);

  const cargarHorarios = async () => {
    try {
      const res = await getHorarios();
      setHorarios(res.data);
    } catch {
      alert("Error al cargar horarios");
    }
  };

  const eliminarHorario = async (id: number) => {
    try {
      await deleteHorario(id);
      alert("Horario eliminado");
      cargarHorarios();
    } catch {
      alert("Error al eliminar horario");
    }
  };

  return (
    <div>
      <h2>Listado de Horarios</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Curso</th>
            <th>Docente</th>
            <th>Aula</th>
            <th>Día</th>
            <th>Hora Inicio</th>
            <th>Hora Fin</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {horarios.map((h) => (
            <tr key={h.id}>
              <td>{h.curso}</td>
              <td>{h.docente}</td>
              <td>{h.aula}</td>
              <td>{h.diaSemana}</td>
              <td>{h.horaInicio}</td>
              <td>{h.horaFin}</td>
              <td>
                <button
                  onClick={() => eliminarHorario(h.id)}
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

export default ListHorariosPage;
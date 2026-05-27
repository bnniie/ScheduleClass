import React, { useEffect, useState } from "react";
import { getDocentes, deleteDocente, updateDocenteState } from "../../services/docenteService";
import styles from "../../styles/Dashboard.module.css";

interface Docente {
  id: number;
  usuario: {
    username: string;
    email: string;
  };
  dedicacion: string;
  restricciones: string;
  disponibilidad: string;
  state: boolean;
}

const ListDocentesPage: React.FC = () => {
  const [docentes, setDocentes] = useState<Docente[]>([]);

  const cargarDocentes = async () => {
    try {
      const res = await getDocentes();
      setDocentes(res.data);
    } catch (error) {
      console.error("Error cargando docentes:", error);
    }
  };

  useEffect(() => {
    cargarDocentes();
  }, []);

  const eliminarDocente = async (id: number) => {
    if (window.confirm("¿Seguro que deseas eliminar este docente?")) {
      try {
        await deleteDocente(id);
        alert("Docente eliminado");
        cargarDocentes();
      } catch (error) {
        alert("Error al eliminar docente");
      }
    }
  };

  const cambiarEstado = async (id: number, estadoActual: boolean) => {
    try {
      await updateDocenteState(id, !estadoActual);
      alert(`Docente ${!estadoActual ? "activado" : "inactivado"}`);
      cargarDocentes();
    } catch (error) {
      alert("Error al cambiar estado del docente");
    }
  };

  return (
    <div>
      <h2>Listado de Docentes</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Dedicación</th>
            <th>Restricciones</th>
            <th>Disponibilidad</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {docentes.map((d) => (
            <tr key={d.id}>
              <td>{d.usuario?.username}</td>
              <td>{d.dedicacion}</td>
              <td>{d.restricciones}</td>
              <td>{d.disponibilidad}</td>
              <td>{d.state ? "Activo" : "Inactivo"}</td>
              <td>
                <button
                  className={styles.buttonSecondary}
                  onClick={() => cambiarEstado(d.id, d.state)}
                >
                  {d.state ? "Inactivar" : "Activar"}
                </button>
                <button
                  className={styles.buttonDanger}
                  onClick={() => eliminarDocente(d.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
          {docentes.length === 0 && (
            <tr>
              <td colSpan={7}>No hay docentes registrados</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListDocentesPage;
import React, { useEffect, useState } from "react";
import { getDocentes, deleteDocente, updateDocenteState, DocenteDTO } from "../../services/docenteService";
import styles from "../../styles/Dashboard.module.css";

const ListDocentesPage: React.FC = () => {
  const [docentes, setDocentes] = useState<DocenteDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const cargarDocentes = async () => {
    try {
      const data = await getDocentes();
      console.log("Docentes cargados:", data);
      setDocentes(data);
    } catch (error) {
      console.error("Error cargando docentes:", error);
      setDocentes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDocentes();
  }, []);

  const eliminarDocente = async (id: number) => {
    try {
      await deleteDocente(id);
      alert("Docente eliminado y usuario revertido a USER");
      cargarDocentes();
    } catch {
      alert("Error al eliminar docente");
    }
  };

  const cambiarEstado = async (id: number, estadoActual: boolean) => {
    try {
      await updateDocenteState(id, !estadoActual);
      alert(`Docente ${!estadoActual ? "activado" : "inactivado"}`);
      cargarDocentes();
    } catch {
      alert("Error al cambiar estado del docente");
    }
  };

  if (loading) {
    return <p>Cargando docentes...</p>;
  }

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
          {docentes.length > 0 ? (
            docentes.map((d) => (
              <tr key={d.id}>
                <td>{d.username}</td>
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
            ))
          ) : (
            <tr>
              <td colSpan={6}>No hay docentes registrados</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListDocentesPage;
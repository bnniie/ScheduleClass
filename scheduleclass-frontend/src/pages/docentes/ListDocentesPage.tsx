import React, { useEffect, useState } from "react";
import { getDocentes, deleteDocente } from "../../services/docenteService";
import styles from "../../styles/Dashboard.module.css";

interface Docente {
  idDocente: number;
  user: {
    username: string;
    email: string;
  };
  contractType: string;
  escalafon: string;
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
        alert("Docente eliminado ✅");
        cargarDocentes();
      } catch (error) {
        alert("Error al eliminar docente");
      }
    }
  };

  return (
    <div>
      <h2>Listado de Docentes</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Email</th>
            <th>Contrato</th>
            <th>Escalafón</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {docentes.map((d) => (
            <tr key={d.idDocente}>
              <td>{d.user?.username}</td>
              <td>{d.user?.email}</td>
              <td>{d.contractType}</td>
              <td>{d.escalafon}</td>
              <td>{d.state ? "Activo" : "Inactivo"}</td>
              <td>
                <button
                  className={styles.buttonSecondary}
                  onClick={() => eliminarDocente(d.idDocente)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
          {docentes.length === 0 && (
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
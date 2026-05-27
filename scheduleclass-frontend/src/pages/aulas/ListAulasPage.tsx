import React, { useEffect, useState } from "react";
import { getAulas, deleteAula } from "../../services/aulaService";
import styles from "../../styles/Dashboard.module.css";

interface Aula {
  id: number;
  nombre: string;
  capacidad: number;
  computadores: boolean;
  sillasMoviles: boolean;
}

const ListAulasPage: React.FC = () => {
  const [aulas, setAulas] = useState<Aula[]>([]);

  useEffect(() => {
    cargarAulas();
  }, []);

  const cargarAulas = async () => {
    const res = await getAulas();
    setAulas(res.data);
  };

  const eliminarAula = async (id: number) => {
    await deleteAula(id);
    alert("Aula eliminada");
    cargarAulas();
  };

  return (
    <div className={styles.main}>
      <h2>Listado de Aulas</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Capacidad</th>
            <th>Computadores</th>
            <th>Sillas Móviles</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {aulas.map((a) => (
            <tr key={a.id}>
              <td>{a.nombre}</td>
              <td>{a.capacidad}</td>
              <td>{a.computadores ? "Sí" : "No"}</td>
              <td>{a.sillasMoviles ? "Sí" : "No"}</td>
              <td>
                <button
                  onClick={() => eliminarAula(a.id)}
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

export default ListAulasPage;
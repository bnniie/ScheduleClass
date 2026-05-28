import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../styles/Dashboard.module.css";

interface Restriccion {
  id: number;
  descripcion: string;
}

const RestriccionesPage: React.FC = () => {
  const [restricciones, setRestricciones] = useState<Restriccion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestricciones = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/docente/restricciones");
        setRestricciones(res.data);
      } catch (error) {
        console.error("Error al cargar restricciones:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestricciones();
  }, []);

  if (loading) {
    return <p>Cargando restricciones...</p>;
  }

  return (
    <div>
      <h2>Mis Restricciones</h2>
      {restricciones.length === 0 ? (
        <p>No tienes restricciones registradas.</p>
      ) : (
        <ul className={styles.list}>
          {restricciones.map((r) => (
            <li key={r.id}>{r.descripcion}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RestriccionesPage;
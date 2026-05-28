import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../styles/Dashboard.module.css";

interface HorarioDisponibleDTO {
  id: number;
  curso: string;
  docente: string;
  aula: string;
  inicio?: string;
  fin?: string;
  cupoActual: number;
  cupoMaximo: number;
  porcentajeOcupacion: number;
}

const CreateHorariosUserPage: React.FC = () => {
  const [horariosDisponibles, setHorariosDisponibles] = useState<HorarioDisponibleDTO[]>([]);
  const [loading, setLoading] = useState(true);

  // Recuperar el username del usuario logueado (guardado en localStorage en el login)
  const username = localStorage.getItem("username");

  useEffect(() => {
    axios.get("http://localhost:8080/api/horarios/disponibles")
      .then(res => {
        setHorariosDisponibles(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error al cargar horarios disponibles", err);
        setLoading(false);
      });
  }, []);

  const inscribirHorario = async (horarioId: number) => {
    try {
      await axios.post(`http://localhost:8080/api/users/username/${username}/horarios/${horarioId}`);
      alert("Horario inscrito");
      // refrescar lista
      const res = await axios.get("http://localhost:8080/api/horarios/disponibles");
      setHorariosDisponibles(res.data);
    } catch (error: any) {
      alert("Error al inscribir horario: " + error.response?.data?.message);
    }
  };

  if (loading) return <p>Cargando horarios...</p>;

  return (
    <div className={styles.main}>
      <h2>Seleccionar Horarios Disponibles</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Curso</th>
            <th>Docente</th>
            <th>Aula</th>
            <th>Inicio</th>
            <th>Fin</th>
            <th>Cupo</th>
            <th>Ocupación (%)</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {horariosDisponibles.map(h => (
            <tr key={h.id}>
              <td>{h.curso || "Sin curso"}</td>
              <td>{h.docente || "Sin docente"}</td>
              <td>{h.aula || "Sin aula"}</td>
              <td>{h.inicio ? new Date(h.inicio.replace(" ", "T")).toLocaleString() : "Sin fecha"}</td>
              <td>{h.fin ? new Date(h.fin.replace(" ", "T")).toLocaleString() : "Sin fecha"}</td>
              <td>{h.cupoActual}/{h.cupoMaximo}</td>
              <td>{h.porcentajeOcupacion.toFixed(1)}%</td>
              <td>
                <button 
                  className={styles.button} 
                  onClick={() => inscribirHorario(h.id)}
                  disabled={h.cupoActual >= h.cupoMaximo}
                >
                  Inscribirse
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreateHorariosUserPage;
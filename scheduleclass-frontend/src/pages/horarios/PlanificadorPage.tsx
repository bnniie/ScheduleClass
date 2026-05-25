import React, { useState } from "react";
import axios from "axios";

interface Horario {
  id: number;
  docente: { nombre: string };
  curso: { nombre: string };
  aula: { nombre: string };
  inicio: string;
  fin: string;
}

const PlanificadorPage: React.FC = () => {
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [loading, setLoading] = useState(false);

  const generarHorarios = async () => {
    setLoading(true);
    try {
      // Lanza la planificación automática
      await axios.post("http://localhost:8080/api/planificador");

      // Consulta los horarios generados
      const res = await axios.get("http://localhost:8080/api/horarios");
      setHorarios(res.data);

      alert("Horarios generados exitosamente");
    } catch (error) {
      alert("Error al generar horarios");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Planificación Automática</h2>
      <button onClick={generarHorarios} disabled={loading}>
        {loading ? "Generando..." : "Generar Horarios"}
      </button>

      <h3>Horarios Generados</h3>
      <ul>
        {horarios.map(h => (
          <li key={h.id}>
            {h.curso.nombre} - {h.docente.nombre} - {h.aula.nombre}  
            ({new Date(h.inicio).toLocaleString()} → {new Date(h.fin).toLocaleString()})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlanificadorPage;
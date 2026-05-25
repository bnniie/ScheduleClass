import React, { useEffect, useState } from "react";
import axios from "axios";

interface Horario {
  id: number;
  docente: { nombre: string };
  curso: { nombre: string };
  aula: { nombre: string };
  inicio: string;
  fin: string;
}

const HorariosPage: React.FC = () => {
  const [horarios, setHorarios] = useState<Horario[]>([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/horarios")
      .then(res => setHorarios(res.data))
      .catch(() => alert("Error al cargar horarios ❌"));
  }, []);

  return (
    <div>
      <h2>Horarios Generados</h2>
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

export default HorariosPage;
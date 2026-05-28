import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../styles/Dashboard.module.css";

interface CursoDTO {
  id: number;
  nombre: string;
  codigo: string;
  creditos: number;
}

const SeleccionCursosPage: React.FC = () => {
  const [cursos, setCursos] = useState<CursoDTO[]>([]);
  const [seleccionados, setSeleccionados] = useState<number[]>([]);
  const username = localStorage.getItem("username");

  useEffect(() => {
    axios.get("http://localhost:8080/api/cursos")
      .then(res => setCursos(res.data))
      .catch(err => console.error("Error al cargar cursos", err));
  }, []);

  const toggleSeleccion = (id: number) => {
    setSeleccionados(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const handleGuardar = async () => {
    if (seleccionados.length === 0) {
      alert("Debes seleccionar al menos un curso");
      return;
    }
    try {
      await axios.post(
        `http://localhost:8080/api/users/username/${username}/cursos`,
        seleccionados
      );
      alert("Cursos seleccionados guardados");
    } catch (error: any) {
      const msg = error.response?.data?.message || "Error desconocido";
      alert("Error al guardar cursos: " + msg);
    }
  };

  return (
    <div>
      <h2>Seleccionar Cursos</h2>
      <ul className={styles.courseList}>
        {cursos.map(c => (
          <li key={c.id} className={styles.courseItem}>
            <label>
              <input
                type="checkbox"
                checked={seleccionados.includes(c.id)}
                onChange={() => toggleSeleccion(c.id)}
              />
              {c.nombre} ({c.codigo}) - {c.creditos} créditos
            </label>
          </li>
        ))}
      </ul>

      <button onClick={handleGuardar} className={styles.button}>
        Guardar
      </button>
    </div>
  );
};

export default SeleccionCursosPage;
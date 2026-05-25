import React, { useEffect, useState } from "react";
import { getDocentes, deleteDocente } from "../../services/docenteService";

interface Docente {
  id: number;
  nombre: string;
  dedicacion: string;
  restricciones: string;
}

const ListDocentesPage: React.FC = () => {
  const [docentes, setDocentes] = useState<Docente[]>([]);

  useEffect(() => {
    cargarDocentes();
  }, []);

  const cargarDocentes = async () => {
    const res = await getDocentes();
    setDocentes(res.data);
  };

  const eliminarDocente = async (id: number) => {
    await deleteDocente(id);
    alert("Docente eliminado");
    cargarDocentes();
  };

  return (
    <div>
      <h2>Listado de Docentes</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Dedicación</th>
            <th>Restricciones</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {docentes.map(d => (
            <tr key={d.id}>
              <td>{d.nombre}</td>
              <td>{d.dedicacion}</td>
              <td>{d.restricciones}</td>
              <td>
                <button onClick={() => eliminarDocente(d.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListDocentesPage;
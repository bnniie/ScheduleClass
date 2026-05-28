import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../styles/Dashboard.module.css";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

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
  const [disponibles, setDisponibles] = useState<HorarioDisponibleDTO[]>([]);
  const [inscritos, setInscritos] = useState<HorarioDisponibleDTO[]>([]);
  const username = localStorage.getItem("username");

  useEffect(() => {
    axios.get("http://localhost:8080/api/horarios/disponibles")
      .then(res => setDisponibles(res.data))
      .catch(err => console.error("Error al cargar horarios disponibles", err));
  }, []);

  const onDragEnd = async (result: any) => {
    const { source, destination } = result;
    if (!destination) return;

    if (source.droppableId === "disponibles" && destination.droppableId === "inscritos") {
      const horario = disponibles[source.index];

      // Validación: evitar duplicados
      if (inscritos.some(h => h.id === horario.id)) {
        alert("Ya estás inscrito en este horario");
        return;
      }

      // Validación: cupo máximo
      if (horario.cupoActual >= horario.cupoMaximo) {
        alert("El horario está lleno");
        return;
      }

      try {
        await axios.post(`http://localhost:8080/api/users/username/${username}/horarios/${horario.id}`);
        alert("Horario inscrito");
        // refrescar listas
        setInscritos([...inscritos, { ...horario, cupoActual: horario.cupoActual + 1 }]);
        const res = await axios.get("http://localhost:8080/api/horarios/disponibles");
        setDisponibles(res.data);
      } catch (error: any) {
        const msg = error.response?.data?.message || "Error desconocido";
        alert("Error al inscribir horario: " + msg);
      }
    }
  };

  return (
    <div className={styles.main}>
      <h2>Seleccionar Horarios Disponibles</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={styles.dragContainer}>
          {/* Lista de disponibles */}
          <Droppable droppableId="disponibles">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className={styles.list}>
                <h3>Disponibles</h3>
                {disponibles.map((h, index) => (
                  <Draggable key={h.id} draggableId={h.id.toString()} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={styles.card}
                      >
                        <strong>{h.curso}</strong> - {h.docente} <br />
                        Aula: {h.aula || "Sin aula"} <br />
                        Inicio: {h.inicio ? new Date(h.inicio.replace(" ", "T")).toLocaleString() : "Sin fecha"} <br />
                        Fin: {h.fin ? new Date(h.fin.replace(" ", "T")).toLocaleString() : "Sin fecha"} <br />
                        Cupo: {h.cupoActual}/{h.cupoMaximo} ({h.porcentajeOcupacion.toFixed(1)}%)
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* Lista de inscritos */}
          <Droppable droppableId="inscritos">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className={styles.list}>
                <h3>Mis Horarios</h3>
                {inscritos.map((h) => (
                  <div key={h.id} className={`${styles.card} ${styles.cardInscrito}`}>
                    <strong>{h.curso}</strong> - {h.docente} <br />
                    Aula: {h.aula || "Sin aula"} <br />
                    Inicio: {h.inicio ? new Date(h.inicio.replace(" ", "T")).toLocaleString() : "Sin fecha"} <br />
                    Fin: {h.fin ? new Date(h.fin.replace(" ", "T")).toLocaleString() : "Sin fecha"} <br />
                    Cupo: {h.cupoActual}/{h.cupoMaximo} ({h.porcentajeOcupacion.toFixed(1)}%)
                  </div>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};

export default CreateHorariosUserPage;
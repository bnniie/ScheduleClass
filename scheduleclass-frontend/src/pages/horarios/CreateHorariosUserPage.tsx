// Autor: Paula Guerrero
// Fecha: 28/05/26
// Descripción: Página React para que el Estudiante pueda crear su horario en el sistema ScheduleClass.
//              Implementando el drag-and-drop.

import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../styles/Dashboard.module.css";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

interface HorarioDisponibleDTO {
  id: number;
  curso: string;
  docente: string;
  aula: string;
  diaSemana: string;
  horaInicio: string;
  horaFin: string;
  cupoActual: number;
  cupoMaximo: number;
  porcentajeOcupacion?: number;
}

const CreateHorariosUserPage: React.FC = () => {
  const [disponibles, setDisponibles] = useState<HorarioDisponibleDTO[]>([]);
  const [inscritos, setInscritos] = useState<HorarioDisponibleDTO[]>([]);
  const [originalInscritos, setOriginalInscritos] = useState<HorarioDisponibleDTO[]>([]);
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (username) {
      axios.get(`http://localhost:8080/api/users/username/${username}/horarios/disponibles`)
        .then(res => setDisponibles(res.data))
        .catch(err => console.error("Error al cargar horarios disponibles", err));

      axios.get(`http://localhost:8080/api/users/username/${username}/horarios`)
        .then(res => {
          setInscritos(res.data);
          setOriginalInscritos(res.data);
        })
        .catch(err => console.error("Error al cargar horarios inscritos", err));
    }
  }, [username]);

  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) return;

    if (source.droppableId === "disponibles" && destination.droppableId === "inscritos") {
      const horario = disponibles[source.index];

      if (inscritos.some(h => h.id === horario.id)) {
        alert("Ya seleccionaste este horario");
        return;
      }

      if (horario.cupoActual >= horario.cupoMaximo) {
        alert("El horario está lleno");
        return;
      }

      setInscritos([...inscritos, horario]);
      setDisponibles(disponibles.filter((_, i) => i !== source.index));
    }

    if (source.droppableId === "inscritos" && destination.droppableId === "disponibles") {
      const horario = inscritos[source.index];
      setDisponibles([...disponibles, horario]);
      setInscritos(inscritos.filter((_, i) => i !== source.index));
    }
  };

  const handleAccept = async () => {
    try {
      const nuevos = inscritos.filter(
        h => !originalInscritos.some(o => o.id === h.id)
      );

      for (const h of nuevos) {
        await axios.post(`http://localhost:8080/api/users/username/${username}/horarios/${h.id}`);
      }

      alert("Horarios nuevos guardados");

      const inscritosRes = await axios.get(`http://localhost:8080/api/users/username/${username}/horarios`);
      setInscritos(inscritosRes.data);
      setOriginalInscritos(inscritosRes.data);

      // Refrescar disponibles filtrados por usuario
      const disponiblesRes = await axios.get(`http://localhost:8080/api/users/username/${username}/horarios/disponibles`);
      setDisponibles(disponiblesRes.data);

    } catch (error: any) {
      const msg = error.response?.data?.message || "Error desconocido";
      alert("Error al guardar horarios: " + msg);
    }
  };

  const handleCancel = async () => {
    try {
      for (const h of originalInscritos) {
        await axios.delete(`http://localhost:8080/api/users/username/${username}/horarios/${h.id}`);
      }
      setInscritos([]);
      setOriginalInscritos([]);
      alert("Horarios cancelados");

      // Refrescar disponibles filtrados por usuario
      const disponiblesRes = await axios.get(`http://localhost:8080/api/users/username/${username}/horarios/disponibles`);
      setDisponibles(disponiblesRes.data);

    } catch (error: any) {
      const msg = error.response?.data?.message || "Error desconocido";
      alert("Error al cancelar horarios: " + msg);
    }
  };

  const renderCard = (h: HorarioDisponibleDTO, extraClass = "") => (
    <div className={`${styles.card} ${extraClass}`}>
      <strong>{h.curso}</strong> - {h.docente} <br />
      Aula: {h.aula} <br />
      Día: {h.diaSemana} <br />
      Hora: {h.horaInicio} - {h.horaFin} <br />
      Cupo: {h.cupoActual}/{h.cupoMaximo} (
        {typeof h.porcentajeOcupacion === "number"
          ? h.porcentajeOcupacion.toFixed(1)
          : "0.0"}%
      )
    </div>
  );

  return (
    <div>
      <h2>Crear Horario</h2>
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
                      >
                        {renderCard(h)}
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
                <div className={styles.headerWithButtons}>
                  <h3>Mis Horarios</h3>
                  <div className={styles.actionsInline}>
                    <button className={styles.acceptButton} onClick={handleAccept}>Aceptar</button>
                    <button className={styles.cancelButton} onClick={handleCancel}>Cancelar</button>
                  </div>
                </div>
                {inscritos.map((h, index) => (
                  <Draggable key={h.id} draggableId={`inscrito-${h.id}`} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {renderCard(h, styles.cardInscrito)}
                      </div>
                    )}
                  </Draggable>
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
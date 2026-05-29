// Autor: Paula Guerrero
// Fecha: 28/05/26
// Descripción: Página React para que el Estudiante pueda visualizar sus horarios el sistema ScheduleClass.
//              Implementación de un calendario para dar una mejor experiencia al usuario.

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

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
  porcentajeOcupacion: number;
  computadores?: boolean;
  sillasMoviles?: boolean;
}

moment.locale("es");
const localizer = momentLocalizer(moment);

const UserCalendarPage: React.FC = () => {
  const [eventos, setEventos] = useState<any[]>([]);
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (username) {
      axios.get(`http://localhost:8080/api/users/username/${username}/horarios`)
        .then(res => {
          const horarios: HorarioDisponibleDTO[] = res.data;

          // Solo de lunes a viernes
          const diasSemana: Record<string, number> = {
            "Lunes": 1,
            "Martes": 2,
            "Miércoles": 3,
            "Jueves": 4,
            "Viernes": 5
          };

          const eventosConvertidos = horarios
            .filter(h => diasSemana[h.diaSemana]) // descarta sábado y domingo
            .map(h => {
              const start = moment().day(diasSemana[h.diaSemana]).set({
                hour: parseInt(h.horaInicio.split(":")[0]),
                minute: parseInt(h.horaInicio.split(":")[1])
              }).toDate();

              const end = moment().day(diasSemana[h.diaSemana]).set({
                hour: parseInt(h.horaFin.split(":")[0]),
                minute: parseInt(h.horaFin.split(":")[1])
              }).toDate();

              const caracteristicas: string[] = [];
              if (h.computadores) caracteristicas.push("Con computadores");
              if (h.sillasMoviles) caracteristicas.push("Con sillas móviles");

              return {
                id: h.id,
                title: `${h.curso} - ${h.docente}`,
                start,
                end,
                resource: { ...h, caracteristicas }
              };
            });

          setEventos(eventosConvertidos);
        })
        .catch(err => console.error("Error al cargar horarios", err));
    }
  }, [username]);

  const eventStyleGetter = () => {
    return {
      style: {
        backgroundColor: "#004D40",
        color: "white",
        borderRadius: "6px",
        border: "none",
        padding: "4px",
        fontSize: "13px"
      }
    };
  };

  const CustomEvent = ({ event }: { event: any }) => {
    const h = event.resource;
    return (
      <div>
        <strong>{event.title}</strong>
        <div style={{ fontSize: "11px", marginTop: "2px" }}>
          Aula: {h.aula} <br />
          {h.caracteristicas.length > 0
            ? `Características: ${h.caracteristicas.join(", ")}`
            : "Características: Ninguna"}
        </div>
      </div>
    );
  };

  const handleSelectEvent = (event: any) => {
    const h = event.resource;
    alert(
      `Curso: ${h.curso}\nDocente: ${h.docente}\nAula: ${h.aula}\nHorario: ${h.horaInicio} - ${h.horaFin}\nCaracterísticas: ${h.caracteristicas.length > 0 ? h.caracteristicas.join(", ") : "Ninguna"}`
    );
  };

  return (
    <div>
      <h2>Horario</h2>
      <Calendar
        localizer={localizer}
        events={eventos}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        defaultView="work_week" 
        views={["work_week", "day", "month"]}
        min={new Date(1970, 1, 1, 8, 0)}
        max={new Date(1970, 1, 1, 22, 0)}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CustomEvent
        }}
        onSelectEvent={handleSelectEvent}
        messages={{
          today: "Hoy",
          previous: "Atrás",
          next: "Siguiente",
          month: "Mes",
          week: "Semana",
          work_week: "Semana",
          day: "Día",
          agenda: "Agenda",
          date: "Fecha",
          time: "Hora",
          event: "Clase",
          noEventsInRange: "No hay clases en este rango"
        }}
      />
    </div>
  );
};

export default UserCalendarPage;
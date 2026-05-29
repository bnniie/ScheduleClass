// Autor: Paula Guerrero
// Fecha: 29/05/26
// Descripción: Página React para que el docente pueda visualizar su Horario en el sistema ScheduleClass.
//              Implementación de un calendario para dar una mejor experiencia al usuario.

import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getHorariosByDocenteId } from "../../services/docenteService";

moment.locale("es");
const localizer = momentLocalizer(moment);

const DocenteCalendarPage: React.FC = () => {
  const [eventos, setEventos] = useState<any[]>([]);
  const docenteId = localStorage.getItem("docenteId");

  useEffect(() => {
    if (docenteId) {
      getHorariosByDocenteId(Number(docenteId))
        .then(horarios => {
          console.log("Horarios recibidos:", horarios);

          const diasSemana: Record<string, number> = {
            "Lunes": 1,
            "Martes": 2,
            "Miércoles": 3,
            "Jueves": 4,
            "Viernes": 5
          };

          const eventosConvertidos = horarios
            .filter(h => diasSemana[h.diaSemana])
            .map(h => {
              const start = moment().day(diasSemana[h.diaSemana]).set({
                hour: parseInt(h.horaInicio.split(":")[0]),
                minute: parseInt(h.horaInicio.split(":")[1])
              }).toDate();

              const end = moment().day(diasSemana[h.diaSemana]).set({
                hour: parseInt(h.horaFin.split(":")[0]),
                minute: parseInt(h.horaFin.split(":")[1])
              }).toDate();

              return {
                id: h.id,
                title: h.cursoNombre,
                start,
                end,
                resource: { ...h }
              };
            });

          setEventos(eventosConvertidos);
        })
        .catch(err => console.error("Error al cargar horarios del docente", err));
    }
  }, [docenteId]);

  const eventStyleGetter = () => ({
    style: {
      backgroundColor: "#1565C0",
      color: "white",
      borderRadius: "6px",
      border: "none",
      padding: "4px",
      fontSize: "13px"
    }
  });

  const CustomEvent = ({ event }: { event: any }) => {
    const h = event.resource;
    return (
      <div>
        <strong>{event.title}</strong>
        <div style={{ fontSize: "11px", marginTop: "2px" }}>
          Aula: {h.aulaNombre}
        </div>
      </div>
    );
  };

  const handleSelectEvent = (event: any) => {
    const h = event.resource;
    alert(
      `Curso: ${h.cursoNombre}\nDía: ${h.diaSemana}\nHorario: ${h.horaInicio} - ${h.horaFin}\nAula: ${h.aulaNombre}`
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
        components={{ event: CustomEvent }}
        onSelectEvent={handleSelectEvent}
        messages={{
          today: "Hoy",
          previous: "Atrás",
          next: "Siguiente",
          month: "Mes",
          week: "Semana",
          work_week: "Semana laboral",
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

export default DocenteCalendarPage;
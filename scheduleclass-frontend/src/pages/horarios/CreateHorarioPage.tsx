// Autor: Paula Guerrero
// Fecha: 27/05/26
// Descripción: Página React para el registro de horarios en el sistema ScheduleClass.
//              Sirve como contenedor de alto nivel que integra el formulario HorarioForm,
//              mostrando un título y delegando la lógica de registro al componente hijo.

import React from "react";
import HorarioForm from "../../components/forms/HorarioForm";

const CreateHorarioPage: React.FC = () => {
  return (
    <div>
      <h2>Registrar Horario</h2>
      <HorarioForm />
    </div>
  );
};

export default CreateHorarioPage;
// Autor: Paula Guerrero
// Fecha: 25/05/26
// Descripción: Página React para el registro de docentes en el sistema ScheduleClass.
//              Sirve como contenedor de alto nivel que integra el formulario DocenteForm,
//              mostrando un título y delegando la lógica de registro al componente hijo.

import React from "react";
import DocenteForm from "../../components/forms/DocenteForm";

const CreateDocentePage: React.FC = () => {
  return (
    <div>
      <h2>Registrar Docente</h2>
      <DocenteForm />
    </div>
  );
};

export default CreateDocentePage;
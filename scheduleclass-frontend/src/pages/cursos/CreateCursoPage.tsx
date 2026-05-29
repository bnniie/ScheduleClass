// Autor: Paula Guerrero
// Fecha: 26/05/26
// Descripción: Página React para el registro de cursos en el sistema ScheduleClass.
//              Sirve como contenedor de alto nivel que integra el formulario CursoForm,
//              mostrando un título y delegando la lógica de registro al componente hijo.

import React from "react";
import CursoForm from "../../components/forms/CursoForm";

const CreateCursoPage: React.FC = () => {
  return (
    <div>
      <h2>Registrar Curso</h2>
      <CursoForm />
    </div>
  );
};

export default CreateCursoPage;
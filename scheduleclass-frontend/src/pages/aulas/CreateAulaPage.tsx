// Autor: Paula Guerrero
// Fecha: 26/05/26
// Descripción: Página React para el registro de aulas en el sistema ScheduleClass.
//              Sirve como contenedor de alto nivel que integra el formulario AulaForm,
//              mostrando un título y delegando la lógica de registro al componente hijo.

import React from "react";
import AulaForm from "../../components/forms/AulaForm";

const CreateAulaPage: React.FC = () => {
  return (
    <div>
      <h2>Registrar Aula</h2>
      <AulaForm />
    </div>
  );
};

export default CreateAulaPage;
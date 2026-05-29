import React, { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Sidebar from "../../components/layout/Sidebar";
import styles from "../../styles/Dashboard.module.css";

import CreateDocentePage from "../docentes/CreateDocentePage";
import ListDocentesPage from "../docentes/ListDocentesPage";
import CreateAulaPage from "../aulas/CreateAulaPage";
import ListAulasPage from "../aulas/ListAulasPage";
import CreateCursoPage from "../cursos/CreateCursoPage";
import ListCursosPage from "../cursos/ListCursosPage";
import CreateHorarioPage from "../horarios/CreateHorarioPage";
import HorariosPage from "../horarios/ListHorariosPage";
import PlanificadorPage from "../horarios/PlanificadorPage";
import CursosAsignadosPage from "../cursos/CursosAsignadosPage";
import CreateHorariosUserPage from "../horarios/CreateHorariosUserPage";
import SeleccionCursosPage from "../cursos/SeleccionCursosPage";
import CursosInscritosPage from "../cursos/CursosInscritosPage";
import UserCalendarPage from "../horarios/UserCalendarPage";
import DocenteCalendarPage from "../docentes/DocenteCalendarPage";

const DashboardPage: React.FC = () => {
  const [selected, setSelected] = useState("home");

  const storedRole = localStorage.getItem("role") || "";
  const role =
    storedRole === "ROLE_ADMIN" || storedRole === "ADMIN"
      ? "ADMIN"
      : storedRole === "ROLE_DOCENTE" || storedRole === "DOCENTE"
      ? "DOCENTE"
      : "USER";

  return (
    <div className={styles.dashboard}>
      <Navbar />
      <div className={styles.content}>
        <Sidebar role={role} selected={selected} setSelected={setSelected} />
        <main className={styles.main}>
          {selected === "home" && (
            <>
              <h2>
                {role === "ADMIN"
                  ? "Bienvenido al Dashboard de Admin"
                  : role === "DOCENTE"
                  ? "Bienvenido al Dashboard de Docente"
                  : "Bienvenido al Dashboard de Estudiante"}
              </h2>
              <p>Selecciona una opción en el menú lateral.</p>
            </>
          )}

          {/* ADMIN */}
          {role === "ADMIN" && (
            <>
              {selected === "docentes_crear" && <CreateDocentePage />}
              {selected === "docentes_listar" && <ListDocentesPage />}
              {selected === "aulas_crear" && <CreateAulaPage />}
              {selected === "aulas_listar" && <ListAulasPage />}
              {selected === "cursos_crear" && <CreateCursoPage />}
              {selected === "cursos_listar" && <ListCursosPage />}
              {selected === "horarios_crear" && <CreateHorarioPage />}
              {selected === "horarios" && <HorariosPage />}
              {selected === "planificador" && <PlanificadorPage />}
            </>
          )}

          {/* USER */}
          {role === "USER" && (
            <>
            {selected === "seleccion_cursos" && <SeleccionCursosPage />}
            {selected === "cursos_inscritos" && <CursosInscritosPage />}
            {selected === "horarios_crear_user" && (<CreateHorariosUserPage />)}
            {selected === "user_calendar" && <UserCalendarPage />}
            </>
          )}

          {/* DOCENTE */}
          {role === "DOCENTE" && (
            <>
              {selected === "cursos_asignados" && <CursosAsignadosPage />}
              {selected === "docente_calendar" && <DocenteCalendarPage />}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
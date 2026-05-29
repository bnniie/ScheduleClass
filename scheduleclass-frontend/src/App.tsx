// Autor: Paula Guerrero
// Fecha: 25/05/26
// Descripción: Componente raíz de la aplicación ScheduleClass.
//              Define la configuración de rutas mediante React Router,
//              organizando las páginas de autenticación, dashboard,
//              docentes, aulas, cursos y horarios.

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/auth/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import RecoverPage from "./pages/auth/RecoverPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import CreateDocentePage from "./pages/docentes/CreateDocentePage";
import ListDocentesPage from "./pages/docentes/ListDocentesPage";
import CreateAulaPage from "./pages/aulas/CreateAulaPage";
import ListAulasPage from "./pages/aulas/ListAulasPage";
import CreateCursoPage from "./pages/cursos/CreateCursoPage";
import ListCursosPage from "./pages/cursos/ListCursosPage";
import CursosAsignadosPage from "./pages/cursos/CursosAsignadosPage";
import ListHorariosPage from "./pages/horarios/ListHorariosPage";
import PlanificadorPage from "./pages/horarios/PlanificadorPage";
import CreateHorarioPage from "./pages/horarios/CreateHorarioPage";
import CreateHorariosUserPage from "./pages/horarios/CreateHorariosUserPage";
import SeleccionCursosPage from "./pages/cursos/SeleccionCursosPage";
import CursosInscritosPage from "./pages/cursos/CursosInscritosPage";
import UserCalendarPage from "./pages/horarios/UserCalendarPage";
import DocenteCalendarPage from "./pages/docentes/DocenteCalendarPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Página principal */}
        <Route path="/" element={<HomePage />} />

        {/* Autenticación */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/recover" element={<RecoverPage />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* Docentes */}
        <Route path="/docentes/crear" element={<CreateDocentePage />} />
        <Route path="/docentes/listar" element={<ListDocentesPage />} />
        <Route path="/docentes/calendar" element={<DocenteCalendarPage />} />

        {/* Aulas */}
        <Route path="/aulas/crear" element={<CreateAulaPage />} />
        <Route path="/aulas/listar" element={<ListAulasPage />} />

        {/* Cursos */}
        <Route path="/cursos/crear" element={<CreateCursoPage />} />
        <Route path="/cursos/listar" element={<ListCursosPage />} />
        <Route path="/cursos/seleccion" element={<SeleccionCursosPage />} />
        <Route path="/cursos/inscritos" element={<CursosInscritosPage />} />
        <Route path="/cursos/listar/docente" element={<CursosAsignadosPage />} />

        {/* Horarios */}
        <Route path="/horarios/crear" element={<CreateHorarioPage />} />
        <Route path="/horarios/listar" element={<ListHorariosPage />} />
        <Route path="/planificador" element={<PlanificadorPage />} />
        <Route path="/horarios/crear/user"element={<CreateHorariosUserPage />} />
        <Route path="/user/calendar" element={<UserCalendarPage />} />

      </Routes>
    </Router>
  );
}

export default App;
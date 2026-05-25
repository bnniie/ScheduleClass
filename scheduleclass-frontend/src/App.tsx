import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Páginas de autenticación
import HomePage from "./pages/auth/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

// Dashboard
import DashboardPage from "./pages/dashboard/DashboardPage";

// Páginas de docentes
import CreateDocentePage from "./pages/docentes/CreateDocentePage";
import ListDocentesPage from "./pages/docentes/ListDocentesPage";

// Páginas de aulas
import CreateAulaPage from "./pages/aulas/CreateAulaPage";
import ListAulasPage from "./pages/aulas/ListAulasPage";

// Páginas de cursos
import CreateCursoPage from "./pages/cursos/CreateCursoPage";
import ListCursosPage from "./pages/cursos/ListCursosPage";

// Páginas de horarios
import HorariosPage from "./pages/horarios/HorariosPage";
import PlanificadorPage from "./pages/horarios/PlanificadorPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Página principal */}
        <Route path="/" element={<HomePage />} />

        {/* Autenticación */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* Docentes */}
        <Route path="/docentes/crear" element={<CreateDocentePage />} />
        <Route path="/docentes/listar" element={<ListDocentesPage />} />

        {/* Aulas */}
        <Route path="/aulas/crear" element={<CreateAulaPage />} />
        <Route path="/aulas/listar" element={<ListAulasPage />} />

        {/* Cursos */}
        <Route path="/cursos/crear" element={<CreateCursoPage />} />
        <Route path="/cursos/listar" element={<ListCursosPage />} />

        {/* Horarios */}
        <Route path="/horarios" element={<HorariosPage />} />
        <Route path="/planificador" element={<PlanificadorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
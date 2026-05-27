import React, { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Sidebar from "../../components/layout/Sidebar";
import styles from "../../styles/Dashboard.module.css";

// Importa las páginas correctas según tu estructura
import CreateDocentePage from "../docentes/CreateDocentePage";
import ListDocentesPage from "../docentes/ListDocentesPage";
import CreateAulaPage from "../aulas/CreateAulaPage";
import ListAulasPage from "../aulas/ListAulasPage";
import CreateCursoPage from "../cursos/CreateCursoPage";
import ListCursosPage from "../cursos/ListCursosPage";
import HorariosPage from "../horarios/HorariosPage";
import PlanificadorPage from "../horarios/PlanificadorPage";

const DashboardPage: React.FC = () => {
  const [selected, setSelected] = useState("home");

  return (
    <div className={styles.dashboard}>
      <Navbar />
      <div className={styles.content}>
        <Sidebar selected={selected} setSelected={setSelected} />
        <main className={styles.main}>
          {selected === "home" && (
            <>
              <h2>Bienvenido al Dashboard</h2>
              <p>Selecciona una opción en el menú lateral.</p>
            </>
          )}
          {selected === "docentes_crear" && <CreateDocentePage />}
          {selected === "docentes_listar" && <ListDocentesPage />}
          {selected === "aulas_crear" && <CreateAulaPage />}
          {selected === "aulas_listar" && <ListAulasPage />}
          {selected === "cursos_crear" && <CreateCursoPage />}
          {selected === "cursos_listar" && <ListCursosPage />}
          {selected === "horarios" && <HorariosPage />}
          {selected === "planificador" && <PlanificadorPage />}
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
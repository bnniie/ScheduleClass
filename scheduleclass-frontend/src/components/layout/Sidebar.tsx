import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/Sidebar.module.css";

const Sidebar: React.FC = () => {
  const role = localStorage.getItem("role");

  return (
    <aside className={styles.sidebar}>
      <ul>
        {role === "ADMIN" || role === "ROLE_ADMIN" ? (
          <>
            <li><Link to="/docentes/crear">Crear Docente</Link></li>
            <li><Link to="/docentes/listar">Listar Docentes</Link></li>
            <li><Link to="/aulas/crear">Crear Aula</Link></li>
            <li><Link to="/aulas/listar">Listar Aulas</Link></li>
            <li><Link to="/cursos/crear">Crear Curso</Link></li>
            <li><Link to="/cursos/listar">Listar Cursos</Link></li>
            <li><Link to="/horarios">Ver Horarios</Link></li>
            <li><Link to="/planificador">Planificador</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/horarios">Ver Horarios</Link></li>
          </>
        )}
      </ul>
    </aside>
  );
};

export default Sidebar;
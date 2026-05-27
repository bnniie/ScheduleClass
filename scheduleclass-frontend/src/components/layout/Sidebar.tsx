import React from "react";
import styles from "../../styles/Sidebar.module.css";

interface SidebarProps {
  selected: string;
  setSelected: (value: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selected, setSelected }) => {
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <aside className={styles.sidebar}>
      <ul className={styles.menu}>
        {role === "ADMIN" || role === "ROLE_ADMIN" ? (
          <>
            <li
              onClick={() => setSelected("docentes_crear")}
              className={selected === "docentes_crear" ? styles.active : ""}
            >
              Crear Docente
            </li>
            <li
              onClick={() => setSelected("docentes_listar")}
              className={selected === "docentes_listar" ? styles.active : ""}
            >
              Listar Docentes
            </li>
            <li
              onClick={() => setSelected("aulas_crear")}
              className={selected === "aulas_crear" ? styles.active : ""}
            >
              Crear Aula
            </li>
            <li
              onClick={() => setSelected("aulas_listar")}
              className={selected === "aulas_listar" ? styles.active : ""}
            >
              Listar Aulas
            </li>
            <li
              onClick={() => setSelected("cursos_crear")}
              className={selected === "cursos_crear" ? styles.active : ""}
            >
              Crear Curso
            </li>
            <li
              onClick={() => setSelected("cursos_listar")}
              className={selected === "cursos_listar" ? styles.active : ""}
            >
              Listar Cursos
            </li>
            <li
              onClick={() => setSelected("horarios_crear")}
              className={selected === "horarios_crear" ? styles.active : ""}
            >
              Crear Horario
            </li>
            <li
              onClick={() => setSelected("horarios")}
              className={selected === "horarios" ? styles.active : ""}
            >
              Listar Horarios
            </li>
            <li
              onClick={() => setSelected("planificador")}
              className={selected === "planificador" ? styles.active : ""}
            >
              Planificador
            </li>
          </>
        ) : null}
      </ul>

      {/* Cerrar Sesión  */}
      <div className={styles.logout} onClick={handleLogout}>
        Cerrar Sesión
      </div>
    </aside>
  );
};

export default Sidebar;
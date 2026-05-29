import React from "react";
import styles from "../../styles/Sidebar.module.css";

interface SidebarProps {
  role: "ADMIN" | "USER" | "DOCENTE";
  selected: string;
  setSelected: (value: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ role, selected, setSelected }) => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <aside className={styles.sidebar}>
      <ul className={styles.menu}>
        {/* Opciones ADMIN */}
        {role === "ADMIN" && (
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
        )}

        {/* Opciones USER */}
        {role === "USER" && (
          <>
            <li
                onClick={() => setSelected("seleccion_cursos")}
                className={selected === "seleccion_curso" ? styles.active : ""}
              >
                Inscribir Cursos
            </li>

            <li
                onClick={() => setSelected("cursos_inscritos")}
                className={selected === "cursos_inscritos" ? styles.active : ""}
              >
                Mis Cursos
            </li>

            <li
              onClick={() => setSelected("horarios_crear_user")}
              className={selected === "horarios_crear_user" ? styles.active : ""}
            >
              Crear Horario
            </li>

            <li
              onClick={() => setSelected("user_calendar")}
              className={selected === "user_calendar" ? styles.active : ""}
            >
              Mi Horario
            </li>
          </>
        )}

        {/* Opciones DOCENTE */}
        {role === "DOCENTE" && (
          <>
            <li
              onClick={() => setSelected("cursos_asignados")}
              className={selected === "cursos_asignados" ? styles.active : ""}
            >
              Mis Cursos Asignados
            </li>
            <li
              onClick={() => setSelected("docente_calendar")}
              className={selected === "docente_calendar" ? styles.active : ""}
            >
              Mis Horarios
            </li>
          </>
        )}
      </ul>

      {/* Cerrar Sesión */}
      <div className={styles.logout} onClick={handleLogout}>
        Cerrar Sesión
      </div>
    </aside>
  );
};

export default Sidebar;
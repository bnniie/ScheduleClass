// Autor: Paula Guerrero
// Fecha: 25/05/26
// Descripción: Componente React que representa la barra de navegación principal
//              de la aplicación ScheduleClass. Muestra el nombre de la aplicación,
//              el icono y el usuario logueado, además de permitir la navegación
//              hacia el Dashboard mediante React Router.

import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/Navbar.module.css";

const Navbar: React.FC = () => {
  const username = localStorage.getItem("username") || "Invitado";
  const navigate = useNavigate();

  return (
    <nav className={styles.navbar}>
      <div
        className={styles.left}
        onClick={() => navigate("/dashboard")}
        style={{ cursor: "pointer" }}
      >
        <img src="/favicon.ico" alt="App Icon" className={styles.logoIcon} />
        <span className={styles.logoText}>ScheduleClass</span>
      </div>

      <div className={styles.right}>
        <span className={styles.user}>{username}</span>
      </div>
    </nav>
  );
};

export default Navbar;
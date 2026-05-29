// Autor: Paula Guerrero
// Fecha: 25/05/26
// Descripción: Página React del index en sistema ScheduleClass.

import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/HomePage.module.css";

const HomePage: React.FC = () => {
  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.homeTitle}>Bienvenido a ScheduleClass</h1>
      <p className={styles.homeSubtitle}>
        Aquí puedes gestionar docentes, aulas, cursos y horarios de manera sencilla.
      </p>
      <div className={styles.homeButtons}>
        <Link to="/login">
          <button className={styles.homeButton}>Iniciar Sesión</button>
        </Link>
        <Link to="/register">
          <button className={styles.homeButton}>Registrarse</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
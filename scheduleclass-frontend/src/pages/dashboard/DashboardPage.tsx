import React from "react";
import Navbar from "../../components/layout/Navbar";
import Sidebar from "../../components/layout/Sidebar";
import styles from "../../styles/Dashboard.module.css";

const DashboardPage: React.FC = () => {
  return (
    <div className={styles.dashboard}>
      <Navbar />
      <div className={styles.content}>
        <Sidebar />
        <main className={styles.main}>
          <h2>Bienvenido al Dashboard</h2>
          <p>Selecciona una opción en el menú lateral.</p>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
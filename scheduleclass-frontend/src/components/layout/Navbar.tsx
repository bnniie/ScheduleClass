import React from "react";
import styles from "../../styles/Navbar.module.css";

const Navbar: React.FC = () => {
  const username = localStorage.getItem("username"); // guardado en login

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>ScheduleClass</div>
      <div className={styles.user}>{username}</div>
    </nav>
  );
};

export default Navbar;
import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Bienvenido a ScheduleClass</h1>
      <p>
        Aquí puedes gestionar docentes, aulas, cursos y horarios de manera sencilla.
      </p>
      <div style={{ marginTop: "20px" }}>
        <Link to="/login">
          <button>Iniciar Sesión</button>
        </Link>
        <Link to="/register" style={{ marginLeft: "10px" }}>
          <button>Registrarse</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
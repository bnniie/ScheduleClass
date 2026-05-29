// Autor: Paula Guerrero
// Fecha: 25/05/26
// Descripción: Página React para el inicio de sesión en el sistema ScheduleClass.

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import styles from "../../styles/LoginPage.module.css";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        username,
        password,
      });

      localStorage.setItem("username", username);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("token", res.data.token || "");

      navigate("/dashboard");
    } catch (error) {
      setErrorMessage("Credenciales inválidas. Intenta nuevamente.");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginContent}>
        <h2 className={styles.loginTitle}>Iniciar Sesión</h2>
        <form onSubmit={handleLogin} className={styles.loginForm}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.loginInput}
            />
          </div>

          {/* Contraseña */}
          <div className={styles.inputGroup}>
            <div className={styles.passwordGroup}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.loginInput}
              />
              <span
                className={styles.eyeIcon}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? FaEyeSlash({}) : FaEye({})}
              </span>
            </div>
          </div>

          {errorMessage && (
            <p className={styles.errorMessage}>{errorMessage}</p>
          )}

          <button type="submit" className={styles.loginButton}>
            Entrar
          </button>
        </form>
        
        {/*Enlace de recuperar contraseña */}
        <button
          className={styles.linkButton}
          onClick={() => navigate("/recover")}
        >
          ¿Olvidaste tu contraseña?
        </button>

        {/* Botón Volver */}
        <button
          className={styles.backButton}
          onClick={() => navigate("/")}
        >
          Volver
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
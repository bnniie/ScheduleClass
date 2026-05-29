// Autor: Paula Guerrero
// Fecha: 25/05/26
// Descripción: Página React para el registro de usuarios en el sistema ScheduleClass.

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import styles from "../../styles/RegisterPage.module.css";

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [emailPrefix, setEmailPrefix] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const validatePassword = (pwd: string) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(pwd);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      setErrorMessage(
        "La contraseña debe tener mínimo 8 caracteres, incluir mayúscula, minúscula, número y símbolo."
      );
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/auth/register", {
        username,
        email: `${emailPrefix}@unbosque.edu.co`,
        password,
        role: "USER",
      });
      setSuccessMessage("Usuario registrado");
      navigate("/login");
    } catch (error) {
      setErrorMessage("Error al registrar usuario");
    }
  };

  return (
    <div className={styles.registerContainer}>
        <form onSubmit={handleRegister} className={styles.registerForm}>
        <h2 className={styles.registerTitle}>Registrarse</h2>
          {/* Usuario */}
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.registerInput}
            />
            <small className={styles.hint}>Ingresa tu nombre de usuario.</small>
          </div>

          {/* Correo institucional */}
          <div className={styles.inputGroup}>
            <div className={styles.emailGroup}>
              <input
                type="text"
                placeholder="Correo institucional"
                value={emailPrefix}
                onChange={(e) => {
                  const cleanValue = e.target.value.replace(/@.*/, "");
                  setEmailPrefix(cleanValue);
                }}
                className={styles.registerInput}
              />
              <span className={styles.emailSuffix}>@unbosque.edu.co</span>
            </div>
            <small className={styles.hint}>
              Ingresa solo el prefijo de tu correo institucional (ejemplo: nombre.apellido).
            </small>
          </div>

          {/* Contraseña */}
          <div className={styles.inputGroup}>
            <div className={styles.passwordGroup}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.registerInput}
              />
              <span
                className={styles.eyeIcon}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? FaEyeSlash({}) : FaEye({})}
              </span>
            </div>
            <small className={styles.hint}>
              La contraseña debe tener mínimo 8 caracteres, incluir mayúscula,
              minúscula, número y símbolo.
            </small>
          </div>

          {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
          {successMessage && <p className={styles.successMessage}>{successMessage}</p>}

          <button type="submit" className={styles.registerButton}>
            Registrar
          </button>

          {/* Botón Volver */}
          <button
            className={styles.backButton}
            onClick={() => navigate("/")}
          >
            Volver
          </button>         
        </form>
      </div>
  );
};

export default RegisterPage;
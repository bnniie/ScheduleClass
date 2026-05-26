import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/RecoverPage.module.css";

const RecoverPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const validatePassword = (pwd: string) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(pwd);
  };

  const handleRecover = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePassword(newPassword)) {
      setErrorMessage(
        "La contraseña debe tener mínimo 8 caracteres, incluir mayúscula, minúscula, número y símbolo."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8080/api/auth/reset", {
        username,
        password: newPassword,
      });

      if (res.status === 200) {
        setSuccessMessage("Tu contraseña ha sido actualizada correctamente.");
        setErrorMessage("");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      setErrorMessage("Error al actualizar la contraseña.");
    }
  };

  return (
    <div className={styles.recoverContainer}>
      <div className={styles.recoverContent}>
        <h2 className={styles.recoverTitle}>Recuperar Contraseña</h2>
        <form onSubmit={handleRecover} className={styles.recoverForm}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.recoverInput}
            />
            <small className={styles.hint}>Ingresa tu nombre de usuario.</small>
          </div>

          <div className={styles.inputGroup}>
            <input
              type="text" 
              placeholder="Nueva contraseña"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={styles.recoverInput}
            />
            <small className={styles.hint}>
              La contraseña debe tener mínimo 8 caracteres, incluir mayúscula,
              minúscula, número y símbolo.
            </small>
          </div>

          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={styles.recoverInput}
            />
            <small className={styles.hint}>Repite la nueva contraseña.</small>
          </div>

          {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
          {successMessage && <p className={styles.successMessage}>{successMessage}</p>}

          <button type="submit" className={styles.recoverButton}>
            Actualizar Contraseña
          </button>

          <button
            className={styles.backButton}
            onClick={() => navigate("/login")}
          >
            Volver
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecoverPage;
import React, { useEffect, useState } from "react";
import { createDocente } from "../../services/docenteService";
import { getUsers } from "../../services/userService";
import styles from "../../styles/Dashboard.module.css";

interface User {
  id: number;
  username: string;
  role: string;
}

const DocenteForm: React.FC = () => {
  const [form, setForm] = useState({
    usuarioId: 0,
    dedicacion: "",
    restricciones: "",
    disponibilidad: ""
  });

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getUsers();
        console.log("Usuarios cargados:", res.data);
        setUsers(res.data);
      } catch (error) {
        console.error("Error cargando usuarios:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "usuarioId" ? Number(value) : value,
    });
    console.log("Nuevo estado:", { ...form, [name]: name === "usuarioId" ? Number(value) : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      usuario: { id: form.usuarioId },
      dedicacion: form.dedicacion,
      restricciones: form.restricciones,
      disponibilidad: form.disponibilidad,
    };
    console.log("Payload enviado:", payload);
    try {
      await createDocente(payload);
      alert("Docente registrado exitosamente");
      setForm({ usuarioId: 0, dedicacion: "", restricciones: "", disponibilidad: "" });
    } catch (error) {
      console.error("Error al registrar docente:", error);
      alert("Error al registrar docente");
    }
  };

  const selectedUser = users.find((u) => u.id === form.usuarioId);

  return (
    <form onSubmit={handleSubmit}>
      <select
        name="usuarioId"
        value={form.usuarioId === 0 ? "" : form.usuarioId}
        onChange={handleChange}
        className={styles.selectBox}
        required
      >
        <option value="">Seleccione un usuario</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.username} - {user.role}
          </option>
        ))}
      </select>

      {selectedUser && (
        <input
          type="text"
          value={selectedUser.username}
          readOnly
          className={styles.inputText}
        />
      )}

      <input
        type="text"
        name="dedicacion"
        placeholder="Dedicación"
        value={form.dedicacion}
        onChange={handleChange}
        className={styles.inputText}
        required
      />

      <input
        type="text"
        name="restricciones"
        placeholder="Restricciones"
        value={form.restricciones}
        onChange={handleChange}
        className={styles.inputText}
        required
      />

      <input
        type="text"
        name="disponibilidad"
        placeholder="Disponibilidad"
        value={form.disponibilidad}
        onChange={handleChange}
        className={styles.inputText}
        required
      />

      <button type="submit" className={styles.button}>
        Guardar
      </button>
    </form>
  );
};

export default DocenteForm;
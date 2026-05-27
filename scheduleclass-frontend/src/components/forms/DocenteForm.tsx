import React, { useEffect, useState } from "react";
import { createDocente } from "../../services/docenteService";
import { getUsers } from "../../services/userService";
import styles from "../../styles/Dashboard.module.css";

interface User {
  idUser: number;
  username: string;
  email: string;
}

const DocenteForm: React.FC = () => {
  const [form, setForm] = useState({
    idUser: "",
    contractType: "",
    escalafon: "",
    state: true,
  });

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getUsers();
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
      [name]: name === "idUser" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createDocente(form);
      alert("Docente registrado exitosamente");
      setForm({ idUser: "", contractType: "", escalafon: "", state: true });
    } catch (error) {
      alert("Error al registrar docente");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Selección de usuario */}
      <select
        name="idUser"
        value={form.idUser}
        onChange={handleChange}
        className={styles.selectBox}
        required
      >
        <option value="">Seleccione un usuario</option>
        {users.map((user) => (
          <option key={user.idUser} value={user.idUser}>
            {user.username} ({user.email})
          </option>
        ))}
      </select>

      {/* Tipo de contrato */}
      <input
        type="text"
        name="contractType"
        placeholder="Tipo de contrato"
        value={form.contractType}
        onChange={handleChange}
        className={styles.inputText}
        required
      />

      {/* Escalafón */}
      <input
        type="text"
        name="escalafon"
        placeholder="Escalafón"
        value={form.escalafon}
        onChange={handleChange}
        className={styles.inputText}
        required
      />

      {/* Estado */}
      <div>
        <label>
          <input
            type="radio"
            name="state"
            checked={form.state === true}
            onChange={() => setForm({ ...form, state: true })}
          />
          Activo
        </label>
        <label>
          <input
            type="radio"
            name="state"
            checked={form.state === false}
            onChange={() => setForm({ ...form, state: false })}
          />
          Inactivo
        </label>
      </div>

      <button type="submit" className={styles.button}>
        Guardar
      </button>
    </form>
  );
};

export default DocenteForm;
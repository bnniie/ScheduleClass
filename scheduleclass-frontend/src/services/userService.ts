import axios from "axios";

const API_URL = "http://localhost:8080/api/users";

// Interfaz que refleja el UsuarioDTO del backend
export interface User {
  id: number;
  username: string;
  role: string;
}

// Obtener todos los usuarios (array plano de DTOs)
export const getUsers = async (): Promise<User[]> => {
  try {
    const res = await axios.get<User[]>(API_URL);
    return Array.isArray(res.data) ? res.data : [];
  } catch (error) {
    console.error("Error obteniendo usuarios:", error);
    return [];
  }
};
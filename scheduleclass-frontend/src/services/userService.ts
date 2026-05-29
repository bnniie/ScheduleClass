// Autor: Paula Guerrero
// Fecha: 25/05/26
// Descripción: Servicio de comunicación con el backend para la gestión de usuarios.
//              Define funciones que realizan peticiones HTTP (GET, POST, DELETE)
//              hacia la API REST de ScheduleClass usando Axios.

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
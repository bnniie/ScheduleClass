// Autor: Paula Guerrero
// Fecha: 28/05/26
// Descripción: Servicio de comunicación con el backend para la gestión de docentes.
//              Define funciones que realizan peticiones HTTP (GET, POST, DELETE)
//              hacia la API REST de ScheduleClass usando Axios.

import axios from "axios";

const API_URL = "http://localhost:8080/api/docentes";

// Interfaz que refleja el DocenteDTO del backend
export interface DocenteDTO {
  id: number;
  username: string;
  dedicacion: string;
  restricciones: string;
  disponibilidad: string;
  state: boolean;
}

// Interfaz para los horarios del docente
export interface HorarioDTO {
  id: number;
  cursoNombre: string;
  diaSemana: string;
  horaInicio: string;
  horaFin: string;
  aulaNombre: string;
}

// Obtener todos los docentes
export const getDocentes = async (): Promise<DocenteDTO[]> => {
  try {
    const res = await axios.get<DocenteDTO[]>(API_URL);
    return Array.isArray(res.data) ? res.data : [];
  } catch (error) {
    console.error("Error obteniendo docentes:", error);
    return [];
  }
};

// Crear docente
export const createDocente = async (docente: {
  usuario: { id: number };
  dedicacion: string;
  restricciones: string;
  disponibilidad: string;
}) => {
  return await axios.post(API_URL, docente);
};

// Eliminar docente
export const deleteDocente = async (id: number) => {
  return await axios.delete(`${API_URL}/${id}`);
};

// Cambiar estado del docente
export const updateDocenteState = async (id: number, nuevoEstado: boolean) => {
  return await axios.put(`${API_URL}/${id}/estado`, { state: nuevoEstado });
};

// Obtener horarios de un docente por ID
export const getHorariosByDocenteId = async (docenteId: number): Promise<HorarioDTO[]> => {
  try {
    const res = await axios.get<HorarioDTO[]>(`${API_URL}/${docenteId}/horarios`);
    return Array.isArray(res.data) ? res.data : [];
  } catch (error) {
    console.error("Error obteniendo horarios del docente:", error);
    return [];
  }
};
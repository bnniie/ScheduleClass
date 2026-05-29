// Autor: Paula Guerrero
// Fecha: 26/05/26
// Descripción: Servicio de comunicación con el backend para la gestión de cursos.
//              Define funciones que realizan peticiones HTTP (GET, POST, DELETE)
//              hacia la API REST de ScheduleClass usando Axios.

import axios from "axios";

const API_URL = "http://localhost:8080/api/cursos";

export const getCursos = () => axios.get(API_URL);
export const createCurso = (curso: any) => axios.post(API_URL, curso);
export const deleteCurso = (id: number) => axios.delete(`${API_URL}/${id}`);
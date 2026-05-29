// Autor: Paula Guerrero
// Fecha: 26/05/26
// Descripción: Servicio de comunicación con el backend para la gestión de aulas.
//              Define funciones que realizan peticiones HTTP (GET, POST, DELETE)
//              hacia la API REST de ScheduleClass usando Axios.

import axios from "axios";

const API_URL = "http://localhost:8080/api/aulas";

export const getAulas = () => axios.get(API_URL);
export const createAula = (aula: any) => axios.post(API_URL, aula);
export const deleteAula = (id: number) => axios.delete(`${API_URL}/${id}`);
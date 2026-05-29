// Autor: Paula Guerrero
// Fecha: 27/05/26
// Descripción: Servicio de comunicación con el backend para la gestión de horarios.
//              Define funciones que realizan peticiones HTTP (GET, POST, DELETE)
//              hacia la API REST de ScheduleClass usando Axios.

import axios from "axios";

const API_URL = "http://localhost:8080/api/horarios";

export const getHorarios = () => axios.get(API_URL);
export const deleteHorario = (id: number) => axios.delete(`${API_URL}/${id}`);
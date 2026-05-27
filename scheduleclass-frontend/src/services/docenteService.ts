import axios from "axios";

const API_URL = "http://localhost:8080/api/docentes";

export const getDocentes = () => axios.get(API_URL);
export const createDocente = (docente: any) => axios.post(API_URL, docente);
export const deleteDocente = (id: number) => axios.delete(`${API_URL}/${id}`);
export const updateDocenteState = (id: number, nuevoEstado: boolean) =>
  axios.put(`${API_URL}/${id}/estado`, nuevoEstado, {
    headers: { "Content-Type": "application/json" }
  });

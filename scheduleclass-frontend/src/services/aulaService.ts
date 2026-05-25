import axios from "axios";

const API_URL = "http://localhost:8080/api/aulas";

export const getAulas = () => axios.get(API_URL);
export const createAula = (aula: any) => axios.post(API_URL, aula);
export const deleteAula = (id: number) => axios.delete(`${API_URL}/${id}`);
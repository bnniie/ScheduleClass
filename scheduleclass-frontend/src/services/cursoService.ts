import axios from "axios";

const API_URL = "http://localhost:8080/api/cursos";

export const getCursos = () => axios.get(API_URL);
export const createCurso = (curso: any) => axios.post(API_URL, curso);
export const deleteCurso = (id: number) => axios.delete(`${API_URL}/${id}`);
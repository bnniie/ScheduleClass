import axios from "axios";

const API_URL = "http://localhost:8080/api/horarios";

export const getHorarios = () => axios.get(API_URL);
export const deleteHorario = (id: number) => axios.delete(`${API_URL}/${id}`);
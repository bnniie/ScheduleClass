// Autor: Paula Guerrero
// Fecha: 29/05/26
// Descripción: Script de pruebas de carga con k6 para el backend de ScheduleClass.
//              Simula usuarios concurrentes que realizan operaciones GET y POST
//              sobre el endpoint /api/cursos, midiendo latencia y errores.

import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 10 },   // empieza con 10 usuarios
    { duration: '1m', target: 50 },    // sube a 50 usuarios
    { duration: '1m', target: 100 },   // escala a 100 usuarios
    { duration: '30s', target: 0 },    // baja a 0 usuarios
  ],
};

export default function () {
  // GET: listar cursos
  let resGet = http.get('http://localhost:8080/api/cursos');
  check(resGet, {
    "GET status is 200": (r) => r.status === 200,
  });

  // POST: crear curso
  let payload = JSON.stringify({
    nombre: "Curso de Prueba",
    sesionesPorSemana: 3,
    capacidadMaxima: 40,
    capacidadMinima: 10,
    codigo: "CURS-001",
    creditos: 3
  });

  let headers = { 'Content-Type': 'application/json' };
  let resPost = http.post('http://localhost:8080/api/cursos', payload, { headers });

  check(resPost, {
    "POST status is 201": (r) => r.status === 201,
  });

  sleep(1); // simula tiempo de espera entre acciones
}
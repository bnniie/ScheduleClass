package co.edu.unbosque.ScheduleClass.service;

import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;

import co.edu.unbosque.ScheduleClass.model.*;
import co.edu.unbosque.ScheduleClass.repository.HorarioRepository;

@Service
public class PlanificadorService {

    private final HorarioService horarioService;
    private final HorarioRepository horarioRepository;

    public PlanificadorService(HorarioService horarioService, HorarioRepository horarioRepository) {
        this.horarioService = horarioService;
        this.horarioRepository = horarioRepository;
    }

    public void generarHorarios(List<Curso> cursos, List<Docente> docentes, List<Aula> aulas) {
        // Ordenar cursos por prioridad: obligatorios > capacidad > sesiones
        cursos.sort(Comparator
            .comparing((Curso c) -> !c.getNombre().toLowerCase().contains("obligatorio"))
            .thenComparing(Comparator.comparingInt(Curso::getCapacidadMaxima).reversed())
            .thenComparing(Comparator.comparingInt(Curso::getSesionesPorSemana).reversed()));

        for (Curso curso : cursos) {
            // Seleccionar docente con menor carga
            Docente docente = docentes.stream()
                .min(Comparator.comparingLong(d -> horarioRepository.findAll().stream()
                    .filter(h -> h.getDocente().getId().equals(d.getId()))
                    .count()))
                .orElseThrow(() -> new IllegalArgumentException("No hay docente disponible"));

            // Día inicial
            LocalDateTime inicio = LocalDateTime.of(2026, 5, 25, 8, 0);
            LocalDateTime fin = inicio.plusHours(2);

            boolean choque;
            do {
                choque = false;

                // Validar choques de docente
                for (Horario h : horarioRepository.findAll()) {
                    if (h.getDocente().getId().equals(docente.getId()) &&
                        inicio.isBefore(h.getFin()) &&
                        fin.isAfter(h.getInicio())) {
                        choque = true;
                        break;
                    }
                }

                // Validar franja prohibida (12:00–13:00)
                if (inicio.getHour() == 12) {
                    inicio = inicio.plusHours(1);
                    fin = inicio.plusHours(2);
                    choque = true;
                }

                // Si hay choque, mover a la siguiente franja
                if (choque) {
                    inicio = inicio.plusHours(2);
                    fin = inicio.plusHours(2);

                    // Si pasa de las 18:00, saltar al día siguiente
                    if (inicio.getHour() >= 18) {
                        inicio = inicio.plusDays(1).withHour(8).withMinute(0);
                        fin = inicio.plusHours(2);
                    }
                }
            } while (choque);

            // Seleccionar aula libre y adecuada (sin lambdas para evitar error de final)
            Aula aulaSeleccionada = null;
            int mejorDiferencia = Integer.MAX_VALUE;

            for (Aula a : aulas) {
                if (a.getCapacidad() >= curso.getCapacidadMinima()) {
                    boolean ocupada = false;
                    for (Horario h : horarioRepository.findAll()) {
                        if (h.getAula().getId().equals(a.getId()) &&
                            inicio.isBefore(h.getFin()) &&
                            fin.isAfter(h.getInicio())) {
                            ocupada = true;
                            break;
                        }
                    }
                    if (!ocupada) {
                        int diferencia = a.getCapacidad() - curso.getCapacidadMinima();
                        if (diferencia < mejorDiferencia) {
                            mejorDiferencia = diferencia;
                            aulaSeleccionada = a;
                        }
                    }
                }
            }

            if (aulaSeleccionada == null) {
                throw new IllegalArgumentException("No hay aula adecuada");
            }

            Horario horario = new Horario();
            horario.setDocente(docente);
            horario.setCurso(curso);
            horario.setAula(aulaSeleccionada);
            horario.setInicio(inicio);
            horario.setFin(fin);

            horarioService.crearHorario(horario);

            System.out.println("Horario asignado: " + curso.getNombre() +
                " con " + docente.getUsuario().getUsername() +
                " en aula " + aulaSeleccionada.getNombre() +
                " de " + inicio + " a " + fin);
        }
    }
}
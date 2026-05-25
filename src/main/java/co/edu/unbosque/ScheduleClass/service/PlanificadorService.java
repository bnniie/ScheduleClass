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
            .comparing((Curso c) -> !c.getNombre().toLowerCase().contains("obligatorio")) // obligatorios primero
            .thenComparing(Comparator.comparingInt(Curso::getCapacidadMaxima).reversed()) // más estudiantes primero
            .thenComparing(Comparator.comparingInt(Curso::getSesionesPorSemana).reversed())); // más sesiones primero

        for (Curso curso : cursos) {
            // Seleccionar docente con menor carga
            Docente docente = docentes.stream()
                .min(Comparator.comparingLong(d -> horarioRepository.findAll().stream()
                    .filter(h -> h.getDocente().getId().equals(d.getId()))
                    .count()))
                .orElseThrow(() -> new IllegalArgumentException("No hay docente disponible"));

            // Seleccionar aula más ajustada
            Aula aula = aulas.stream()
                .filter(a -> a.getCapacidad() >= curso.getCapacidadMinima())
                .min(Comparator.comparingInt(a -> a.getCapacidad() - curso.getCapacidadMinima()))
                .orElseThrow(() -> new IllegalArgumentException("No hay aula adecuada"));

            // Día inicial
            LocalDateTime inicio = LocalDateTime.of(2026, 5, 25, 8, 0);
            LocalDateTime fin = inicio.plusHours(2);

            boolean choque;
            do {
                choque = false;
                for (Horario h : horarioRepository.findAll()) {
                    if (h.getDocente().getId().equals(docente.getId()) &&
                        inicio.isBefore(h.getFin()) &&
                        fin.isAfter(h.getInicio())) {
                        choque = true;
                        break;
                    }
                }

                if (choque) {
                    inicio = inicio.plusHours(2);
                    fin = inicio.plusHours(2);

                    if (inicio.getHour() >= 18) {
                        inicio = inicio.plusDays(1).withHour(8).withMinute(0);
                        fin = inicio.plusHours(2);
                    }
                }
            } while (choque);

            Horario horario = new Horario();
            horario.setDocente(docente);
            horario.setCurso(curso);
            horario.setAula(aula);
            horario.setInicio(inicio);
            horario.setFin(fin);

            horarioService.crearHorario(horario);
        }
    }
}
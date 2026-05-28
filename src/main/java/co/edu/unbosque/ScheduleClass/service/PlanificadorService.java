package co.edu.unbosque.ScheduleClass.service;

import org.springframework.stereotype.Service;
import java.util.*;
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
        // Ordenar cursos por prioridad
        cursos.sort(Comparator
            .comparing((Curso c) -> !c.getNombre().toLowerCase().contains("obligatorio"))
            .thenComparing(Comparator.comparingInt(Curso::getCapacidadMaxima).reversed())
            .thenComparing(Comparator.comparingInt(Curso::getSesionesPorSemana).reversed()));

        // Días disponibles
        String[] dias = {"Lunes", "Martes", "Miércoles", "Jueves", "Viernes"};
        // Franjas horarias disponibles
        String[][] franjas = {
            {"08:00", "10:00"},
            {"10:00", "12:00"},
            {"14:00", "16:00"},
            {"16:00", "18:00"}
        };

        // Filtrar docentes activos
        List<Docente> docentesActivos = docentes.stream()
            .filter(Docente::isState)
            .toList();

        Map<Long, Docente> cursoDocenteMap = new HashMap<>();
        int docenteIndex = 0;
        int aulaIndex = 0;

        for (Curso curso : cursos) {
            // Asignar docente fijo para el curso
            Docente docenteAsignado = cursoDocenteMap.get(curso.getId());
            if (docenteAsignado == null) {
                docenteAsignado = docentesActivos.get(docenteIndex % docentesActivos.size());
                cursoDocenteMap.put(curso.getId(), docenteAsignado);
                docenteIndex++;
            }

            // Generar sesiones distribuidas en días distintos
            int sesiones = curso.getSesionesPorSemana();
            for (int i = 0; i < sesiones; i++) {

                String diaSemana = dias[(i + docenteIndex) % dias.length];
                String horaInicio = franjas[i % franjas.length][0];
                String horaFin = franjas[i % franjas.length][1];

                // Buscar franja libre para ese docente
                final Docente docenteFinal = docenteAsignado;
                final String inicioFinal = horaInicio;
                final String finFinal = horaFin;

                boolean ocupado = horarioRepository.findAll().stream().anyMatch(h ->
                    h.getDocente().getId().equals(docenteFinal.getId()) &&
                    h.getDiaSemana().equalsIgnoreCase(diaSemana) &&
                    !(finFinal.compareTo(h.getHoraInicio()) <= 0 || inicioFinal.compareTo(h.getHoraFin()) >= 0)
                );
                if (ocupado) {
                    System.out.println("Docente ocupado en " + diaSemana + " " + inicioFinal + "-" + finFinal);
                    continue;
                }

                // Seleccionar aula libre
                Aula aulaSeleccionada = null;
                for (int j = 0; j < aulas.size(); j++) {
                    Aula a = aulas.get((aulaIndex + j) % aulas.size());
                    boolean ocupada = horarioRepository.findAll().stream().anyMatch(h ->
                        h.getAula().getId().equals(a.getId()) &&
                        h.getDiaSemana().equalsIgnoreCase(diaSemana) &&
                        !(finFinal.compareTo(h.getHoraInicio()) <= 0 || inicioFinal.compareTo(h.getHoraFin()) >= 0)
                    );
                    if (!ocupada && a.getCapacidad() >= curso.getCapacidadMinima()) {
                        aulaSeleccionada = a;
                        aulaIndex++;
                        break;
                    }
                }
                if (aulaSeleccionada == null) {
                    System.out.println("No hay aula libre para " + curso.getNombre());
                    continue;
                }

                // Crear horario
                Horario horario = new Horario();
                horario.setDocente(docenteAsignado);
                horario.setCurso(curso);
                horario.setAula(aulaSeleccionada);
                horario.setDiaSemana(diaSemana);
                horario.setHoraInicio(horaInicio);
                horario.setHoraFin(horaFin);
                horario.setCupoMaximo(aulaSeleccionada.getCapacidad());
                horario.setCupoActual(0);

                horarioService.crearHorario(horario);

                System.out.println("Horario asignado: " + curso.getNombre() +
                    " con " + docenteAsignado.getUsuario().getUsername() +
                    " en aula " + aulaSeleccionada.getNombre() +
                    " | Día: " + diaSemana +
                    " | Hora: " + horaInicio + " - " + horaFin);
            }
        }
    }
}
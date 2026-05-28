package co.edu.unbosque.ScheduleClass.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

import co.edu.unbosque.ScheduleClass.model.Horario;
import co.edu.unbosque.ScheduleClass.model.Curso;
import co.edu.unbosque.ScheduleClass.model.Docente;
import co.edu.unbosque.ScheduleClass.model.Aula;
import co.edu.unbosque.ScheduleClass.repository.HorarioRepository;
import co.edu.unbosque.ScheduleClass.repository.CursoRepository;
import co.edu.unbosque.ScheduleClass.repository.DocenteRepository;
import co.edu.unbosque.ScheduleClass.repository.AulaRepository;

@Service
public class HorarioService {

    private final HorarioRepository horarioRepository;
    private final CursoRepository cursoRepository;
    private final DocenteRepository docenteRepository;
    private final AulaRepository aulaRepository;

    public HorarioService(HorarioRepository horarioRepository,
                          CursoRepository cursoRepository,
                          DocenteRepository docenteRepository,
                          AulaRepository aulaRepository) {
        this.horarioRepository = horarioRepository;
        this.cursoRepository = cursoRepository;
        this.docenteRepository = docenteRepository;
        this.aulaRepository = aulaRepository;
    }

    /**
     * Crear un horario puntual (usado por el formulario).
     */
    @Transactional
    public Horario crearHorario(Horario horario) {
        // Cargar entidades completas desde la BD
        Curso curso = cursoRepository.findById(horario.getCurso().getId())
                .orElseThrow(() -> new IllegalArgumentException("Curso no encontrado"));
        Docente docente = docenteRepository.findById(horario.getDocente().getId())
                .orElseThrow(() -> new IllegalArgumentException("Docente no encontrado"));
        Aula aula = aulaRepository.findById(horario.getAula().getId())
                .orElseThrow(() -> new IllegalArgumentException("Aula no encontrada"));

        // Validar que el docente esté activo
        if (!docente.isState()) {
            throw new IllegalArgumentException("El docente está inactivo y no puede recibir horarios.");
        }

        horario.setCurso(curso);
        horario.setDocente(docente);
        horario.setAula(aula);

        // Validación 1: evitar choques de horarios para el mismo docente en el mismo día
        List<Horario> horariosDocente = horarioRepository.findAll();
        for (Horario h : horariosDocente) {
            if (h.getDocente().getId().equals(docente.getId())
                && h.getDiaSemana().equalsIgnoreCase(horario.getDiaSemana())) {
                boolean choque = !(horario.getHoraFin().compareTo(h.getHoraInicio()) <= 0 ||
                                   horario.getHoraInicio().compareTo(h.getHoraFin()) >= 0);
                if (choque) {
                    throw new IllegalArgumentException("El docente ya tiene clase en ese horario.");
                }
            }
        }

        // Validación 2: capacidad del aula >= capacidad mínima del curso
        if (aula.getCapacidad() < curso.getCapacidadMinima()) {
            throw new IllegalArgumentException("El aula no cumple con la capacidad mínima del curso.");
        }

        // Validación 3: disponibilidad del docente (ejemplo: no antes de las 08:00)
        String disponibilidad = docente.getDisponibilidad();
        if (disponibilidad != null && horario.getHoraInicio().compareTo("08:00") < 0) {
            throw new IllegalArgumentException("El docente no está disponible antes de las 08:00.");
        }

        // Validación 4: aula con computadores si el curso lo requiere
        if (curso.getNombre() != null && curso.getNombre().toLowerCase().contains("laboratorio")
            && !aula.isComputadores()) {
            throw new IllegalArgumentException("El curso requiere un aula con computadores.");
        }

        // Validación 5: franja horaria válida
        if (Integer.parseInt(horario.getHoraInicio().substring(0,2)) < 7 ||
            Integer.parseInt(horario.getHoraFin().substring(0,2)) > 21) {
            throw new IllegalArgumentException("El horario debe estar entre 07:00 y 21:00.");
        }

        // Inicializar cupos
        horario.setCupoActual(0);
        if (horario.getCupoMaximo() == 0 && aula != null) {
            horario.setCupoMaximo(aula.getCapacidad());
        }

        System.out.println("Horario creado: " + curso.getNombre() + " - " 
                + docente.getUsuario().getUsername()
                + " en aula " + aula.getNombre() 
                + " | Día: " + horario.getDiaSemana()
                + " | Hora: " + horario.getHoraInicio() + " - " + horario.getHoraFin()
                + " | Cupo: " + horario.getCupoActual() + "/" + horario.getCupoMaximo());

        return horarioRepository.save(horario);
    }

    /**
     * Generar automáticamente varios horarios para un curso
     * según sesionesPorSemana. Se usa en el planificador, no en el formulario.
     */
    @Transactional
    public void generarHorariosPorCurso(Curso curso, Docente docente, Aula aula) {
        // Días disponibles para asignar
        String[] dias = {"Lunes", "Martes", "Miércoles", "Jueves", "Viernes"};
        int sesiones = curso.getSesionesPorSemana();

        // Distribuir sesiones en días distintos
        for (int i = 0; i < sesiones && i < dias.length; i++) {
            Horario horario = new Horario();
            horario.setCurso(curso);
            horario.setDocente(docente);
            horario.setAula(aula);
            horario.setDiaSemana(dias[i]); // cada sesión en un día distinto
            horario.setHoraInicio("08:00");
            horario.setHoraFin("10:00");
            horario.setCupoMaximo(aula.getCapacidad());
            horario.setCupoActual(0);

            horarioRepository.save(horario);

            System.out.println("Horario generado automáticamente: " + curso.getNombre() +
                " con " + docente.getUsuario().getUsername() +
                " en aula " + aula.getNombre() +
                " | Día: " + dias[i] +
                " | Hora: 08:00 - 10:00");
        }
    }

    public List<Horario> listar() {
        return horarioRepository.findAll();
    }
}
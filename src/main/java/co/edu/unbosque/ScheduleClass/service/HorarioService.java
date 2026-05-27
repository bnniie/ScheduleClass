package co.edu.unbosque.ScheduleClass.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.time.LocalTime;

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

    @Transactional
    public Horario crearHorario(Horario horario) {
        // Cargar entidades completas desde la BD
        Curso curso = cursoRepository.findById(horario.getCurso().getId())
                .orElseThrow(() -> new IllegalArgumentException("Curso no encontrado"));
        Docente docente = docenteRepository.findById(horario.getDocente().getId())
                .orElseThrow(() -> new IllegalArgumentException("Docente no encontrado"));
        Aula aula = aulaRepository.findById(horario.getAula().getId())
                .orElseThrow(() -> new IllegalArgumentException("Aula no encontrada"));

        horario.setCurso(curso);
        horario.setDocente(docente);
        horario.setAula(aula);

        // Validación 1: evitar choques de horarios para el mismo docente
        List<Horario> horariosDocente = horarioRepository.findAll();
        for (Horario h : horariosDocente) {
            if (h.getDocente().getId().equals(docente.getId())) {
                boolean choque = horario.getInicio().isBefore(h.getFin()) &&
                                 horario.getFin().isAfter(h.getInicio());
                if (choque) {
                    throw new IllegalArgumentException("El docente ya tiene clase en ese horario.");
                }
            }
        }

        // Validación 2: capacidad del aula >= capacidad mínima del curso
        if (aula.getCapacidad() < curso.getCapacidadMinima()) {
            throw new IllegalArgumentException("El aula no cumple con la capacidad mínima del curso.");
        }

        // Validación 3: disponibilidad del docente (permitir desde las 08:00 en adelante)
        String disponibilidad = docente.getDisponibilidad();
        if (disponibilidad != null && horario.getInicio().toLocalTime().isBefore(LocalTime.of(8,0))) {
            throw new IllegalArgumentException("El docente no está disponible antes de las 08:00.");
        }

        // Validación 4: aula con computadores si el curso lo requiere
        if (curso.getNombre() != null && curso.getNombre().toLowerCase().contains("laboratorio")
            && !aula.isComputadores()) {
            throw new IllegalArgumentException("El curso requiere un aula con computadores.");
        }

        // Validación 5: franja horaria válida
        if (horario.getInicio().getHour() < 7 || horario.getFin().getHour() > 21) {
            throw new IllegalArgumentException("El horario debe estar entre 07:00 y 21:00.");
        }

        System.out.println("Horario creado: " + curso.getNombre() + " - " + docente.getUsuario().getUsername()
                + " en aula " + aula.getNombre() + " desde " + horario.getInicio() + " hasta " + horario.getFin());

        return horarioRepository.save(horario);
    }

    public List<Horario> listar() {
        return horarioRepository.findAll();
    }
}
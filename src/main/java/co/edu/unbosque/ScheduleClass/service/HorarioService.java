package co.edu.unbosque.ScheduleClass.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

import co.edu.unbosque.ScheduleClass.model.Horario;
import co.edu.unbosque.ScheduleClass.repository.HorarioRepository;

@Service
public class HorarioService {

    private final HorarioRepository horarioRepository;

    public HorarioService(HorarioRepository horarioRepository) {
        this.horarioRepository = horarioRepository;
    }

    @Transactional
    public Horario crearHorario(Horario horario) {
        // Validación 1: evitar choques de horarios para el mismo docente
        List<Horario> horariosDocente = horarioRepository.findAll();
        for (Horario h : horariosDocente) {
            if (h.getDocente().getId().equals(horario.getDocente().getId())) {
                boolean choque = horario.getInicio().isBefore(h.getFin()) &&
                                 horario.getFin().isAfter(h.getInicio());
                if (choque) {
                    throw new IllegalArgumentException("El docente ya tiene clase en ese horario.");
                }
            }
        }

        // Validación 2: capacidad del aula >= capacidad mínima del curso
        if (horario.getAula().getCapacidad() < horario.getCurso().getCapacidadMinima()) {
            throw new IllegalArgumentException("El aula no cumple con la capacidad mínima del curso.");
        }

        // Validación 3: disponibilidad del docente
        String disponibilidad = horario.getDocente().getDisponibilidad(); 
        if (disponibilidad != null && !horario.getInicio().toLocalTime().isAfter(java.time.LocalTime.of(8,0))) {
            throw new IllegalArgumentException("El docente no está disponible antes de las 08:00.");
        }

        // Validación 4: aula con computadores si el curso lo requiere
        if (horario.getCurso().getNombre().toLowerCase().contains("laboratorio") 
            && !horario.getAula().isComputadores()) {
            throw new IllegalArgumentException("El curso requiere un aula con computadores.");
        }

        // Validación 5: franja horaria válida
        if (horario.getInicio().getHour() < 7 || horario.getFin().getHour() > 21) {
            throw new IllegalArgumentException("El horario debe estar entre 07:00 y 21:00.");
        }

        return horarioRepository.save(horario);
    }

    public List<Horario> listar() {
        return horarioRepository.findAll();
    }
}
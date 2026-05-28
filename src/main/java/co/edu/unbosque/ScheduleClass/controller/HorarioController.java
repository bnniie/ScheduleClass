package co.edu.unbosque.ScheduleClass.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import co.edu.unbosque.ScheduleClass.dto.HorarioDisponibleDTO;
import co.edu.unbosque.ScheduleClass.model.Horario;
import co.edu.unbosque.ScheduleClass.service.HorarioService;
import co.edu.unbosque.ScheduleClass.repository.HorarioRepository;

@RestController
@RequestMapping("/api/horarios")
public class HorarioController {

    private final HorarioService horarioService;
    private final HorarioRepository horarioRepository;

    public HorarioController(HorarioService horarioService, HorarioRepository horarioRepository) {
        this.horarioService = horarioService;
        this.horarioRepository = horarioRepository;
    }

    // Listar todos los horarios
    @GetMapping
    public List<Horario> listar() {
        return horarioService.listar();
    }

    // Crear horario
    @PostMapping
    public Horario crear(@RequestBody Horario horario) {
        return horarioService.crearHorario(horario);
    }

    // Obtener horario por ID
    @GetMapping("/{id}")
    public ResponseEntity<Horario> obtener(@PathVariable Long id) {
        Optional<Horario> horario = horarioRepository.findById(id);
        return horario.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Eliminar horario
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (!horarioRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        horarioRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/disponibles")
    public List<HorarioDisponibleDTO> listarDisponibles() {
        return horarioRepository.findAll().stream()
            .map(h -> new HorarioDisponibleDTO(
                h.getId(),
                h.getCurso() != null ? h.getCurso().getNombre() : "Sin curso",
                (h.getDocente() != null && h.getDocente().getUsuario() != null) 
                    ? h.getDocente().getUsuario().getUsername() 
                    : "Sin docente",
                h.getAula() != null ? h.getAula().getNombre() : "Sin aula",
                h.getInicio(),
                h.getFin(),
                h.getCupoActual(),
                h.getCupoMaximo()
            ))
            .collect(Collectors.toList());
    }
}
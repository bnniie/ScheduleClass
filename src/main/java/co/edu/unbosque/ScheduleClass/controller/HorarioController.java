package co.edu.unbosque.ScheduleClass.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
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

    @GetMapping
    public List<Horario> listar() {
        return horarioService.listar();
    }

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
}
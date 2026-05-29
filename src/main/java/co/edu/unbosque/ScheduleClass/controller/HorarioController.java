package co.edu.unbosque.ScheduleClass.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.ArrayList;

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

    // Listar todos los horarios (como DTO)
    @GetMapping
    public List<HorarioDisponibleDTO> listar() {
        return horarioRepository.findAll().stream()
            .map(this::convertirADTO)
            .collect(Collectors.toList());
    }

    // Crear un solo horario y devolverlo como DTO
    @PostMapping
    public HorarioDisponibleDTO crear(@RequestBody Horario horario) {
        Horario creado = horarioService.crearHorario(horario);
        return convertirADTO(creado);
    }

    // Crear varios horarios en lote y devolverlos como DTO
    @PostMapping("/lote")
    public ResponseEntity<List<HorarioDisponibleDTO>> crearHorarios(@RequestBody List<Horario> horarios) {
        List<HorarioDisponibleDTO> creados = new ArrayList<>();
        for (Horario h : horarios) {
            Horario creado = horarioService.crearHorario(h);
            creados.add(convertirADTO(creado));
        }
        return ResponseEntity.ok(creados);
    }

    // Obtener horario por ID (como DTO)
    @GetMapping("/{id}")
    public ResponseEntity<HorarioDisponibleDTO> obtener(@PathVariable Long id) {
        Optional<Horario> horario = horarioRepository.findById(id);
        return horario.map(h -> ResponseEntity.ok(convertirADTO(h)))
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

    // Listar horarios disponibles (con cupo libre)
    @GetMapping("/disponibles")
    public List<HorarioDisponibleDTO> listarDisponibles() {
        return horarioRepository.findAll().stream()
            .filter(h -> h.getCupoActual() < h.getCupoMaximo())
            .map(this::convertirADTO)
            .collect(Collectors.toList());
    }

    // Método privado para convertir Horario en HorarioDisponibleDTO
    private HorarioDisponibleDTO convertirADTO(Horario h) {
        String cursoNombre = (h.getCurso() != null) ? h.getCurso().getNombre() : "Sin curso";
        String docenteNombre = (h.getDocente() != null && h.getDocente().getUsuario() != null)
                ? h.getDocente().getUsuario().getUsername()
                : "Sin docente";
        String aulaNombre = (h.getAula() != null) ? h.getAula().getNombre() : "Sin aula";

        boolean computadores = (h.getAula() != null) && h.getAula().isComputadores();
        boolean sillasMoviles = (h.getAula() != null) && h.getAula().isSillasMoviles();

        return new HorarioDisponibleDTO(
            h.getId(),
            cursoNombre,
            docenteNombre,
            aulaNombre,
            h.getDiaSemana(),
            h.getHoraInicio(),
            h.getHoraFin(),
            h.getCupoActual(),
            h.getCupoMaximo(),
            computadores,
            sillasMoviles
        );
    }
}
// Autor: Paula Guerrero
// Fecha: 25/05/26
// Descripción: Controlador REST para la gestión de usuarios en el sistema ScheduleClass.
//              Proporciona operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre la entidad Usuario.

package co.edu.unbosque.ScheduleClass.controller;

import co.edu.unbosque.ScheduleClass.dto.HorarioDisponibleDTO;
import co.edu.unbosque.ScheduleClass.dto.UsuarioDTO;
import co.edu.unbosque.ScheduleClass.model.Usuario;
import co.edu.unbosque.ScheduleClass.model.Horario;
import co.edu.unbosque.ScheduleClass.model.Curso;
import co.edu.unbosque.ScheduleClass.repository.UsuarioRepository;
import co.edu.unbosque.ScheduleClass.repository.HorarioRepository;
import co.edu.unbosque.ScheduleClass.repository.CursoRepository;
import co.edu.unbosque.ScheduleClass.service.UsuarioService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UsuarioController {

    private final UsuarioService usuarioService;
    private final UsuarioRepository usuarioRepository;
    private final HorarioRepository horarioRepository;
    private final CursoRepository cursoRepository;

    public UsuarioController(UsuarioService usuarioService,
                             UsuarioRepository usuarioRepository,
                             HorarioRepository horarioRepository,
                             CursoRepository cursoRepository) {
        this.usuarioService = usuarioService;
        this.usuarioRepository = usuarioRepository;
        this.horarioRepository = horarioRepository;
        this.cursoRepository = cursoRepository;
    }

    // Listar todos los usuarios
    @GetMapping
    public List<UsuarioDTO> getAllUsers() {
        return usuarioService.getAllUsers().stream()
                .map(u -> new UsuarioDTO(u.getId(), u.getUsername(), u.getRole()))
                .collect(Collectors.toList());
    }

    // Obtener usuario por ID
    @GetMapping("/{id}")
    public Optional<Usuario> getUserById(@PathVariable Long id) {
        return usuarioService.getUserById(id);
    }

    // Crear usuario
    @PostMapping
    public Usuario createUser(@RequestBody Usuario usuario) {
        return usuarioService.createUser(usuario);
    }

    // Eliminar usuario
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        usuarioService.deleteUser(id);
    }

    // Inscribir usuario en un horario usando ID
    @PostMapping("/{usuarioId}/horarios/{horarioId}")
    public ResponseEntity<Usuario> inscribirHorario(
            @PathVariable Long usuarioId,
            @PathVariable Long horarioId) {
        Usuario usuario = usuarioService.inscribirHorario(usuarioId, horarioId);
        return ResponseEntity.ok(usuario);
    }

    // Inscribir usuario en un horario usando username
    @PostMapping("/username/{username}/horarios/{horarioId}")
    public ResponseEntity<?> inscribirHorarioPorUsername(
            @PathVariable String username,
            @PathVariable Long horarioId) {
        Usuario usuario = usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        if (!"USER".equalsIgnoreCase(usuario.getRole())) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Solo los usuarios con rol USER pueden inscribirse en horarios."));
        }

        Horario horario = horarioRepository.findById(horarioId)
                .orElseThrow(() -> new IllegalArgumentException("Horario no encontrado"));

        if (horario.getCupoActual() >= horario.getCupoMaximo()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "El horario está lleno"));
        }

        usuario.getHorariosInscritos().add(horario);
        horario.setCupoActual(horario.getCupoActual() + 1);

        usuarioRepository.save(usuario);
        horarioRepository.save(horario);

        return ResponseEntity.ok(usuario);
    }

    // Listar horarios inscritos de un usuario por ID (devuelve DTO)
    @GetMapping("/{usuarioId}/horarios")
    public ResponseEntity<List<HorarioDisponibleDTO>> getHorariosInscritos(@PathVariable Long usuarioId) {
        Optional<Usuario> usuarioOpt = usuarioService.getUserById(usuarioId);
        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        List<HorarioDisponibleDTO> dtos = usuarioOpt.get().getHorariosInscritos().stream()
            .map(this::convertirADTO)
            .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    // Listar horarios inscritos de un usuario por username (devuelve DTO)
    @GetMapping("/username/{username}/horarios")
    public ResponseEntity<List<HorarioDisponibleDTO>> getHorariosInscritosPorUsername(@PathVariable String username) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByUsername(username);
        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        List<HorarioDisponibleDTO> dtos = usuarioOpt.get().getHorariosInscritos().stream()
            .map(this::convertirADTO)
            .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    // Listar horarios disponibles de un usuario (solo cursos inscritos y con cupo libre)
    @GetMapping("/username/{username}/horarios/disponibles")
    public ResponseEntity<List<HorarioDisponibleDTO>> listarDisponiblesPorUsuario(@PathVariable String username) {
        Usuario usuario = usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        List<HorarioDisponibleDTO> dtos = horarioRepository.findAll().stream()
            .filter(h -> h.getCupoActual() < h.getCupoMaximo()) // solo horarios con cupo
            .filter(h -> usuario.getCursos().contains(h.getCurso())) // solo cursos inscritos del usuario
            .map(this::convertirADTO)
            .collect(Collectors.toList());

        return ResponseEntity.ok(dtos);
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
    
    // Guardar cursos seleccionados por username con validaciones
    @PostMapping("/username/{username}/cursos")
    public ResponseEntity<?> inscribirCursosPorUsername(
            @PathVariable String username,
            @RequestBody List<Long> cursosIds) {

        Usuario usuario = usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        List<Curso> cursos = cursoRepository.findAllById(cursosIds);

        for (Curso curso : cursos) {
            // Validación: evitar duplicados
            if (usuario.getCursos().contains(curso)) {
                return ResponseEntity.badRequest()
                        .body(Map.of("message", "El usuario ya está inscrito en el curso: " + curso.getNombre()));
            }

            // Validación: cupo máximo
            long inscritos = usuarioRepository.countByCursos_Id(curso.getId());
            if (inscritos >= curso.getCapacidadMaxima()) {
                return ResponseEntity.badRequest()
                        .body(Map.of("message", "El curso " + curso.getNombre() + " ya alcanzó el cupo máximo."));
            }
        }

        usuario.getCursos().addAll(cursos);
        usuarioRepository.save(usuario);

        return ResponseEntity.ok(usuario);
    }

    // Listar cursos inscritos por username
    @GetMapping("/username/{username}/cursos")
    public ResponseEntity<List<Curso>> getCursosInscritosPorUsername(@PathVariable String username) {
        Usuario usuario = usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        return ResponseEntity.ok(usuario.getCursos());
    }

    // Dar de baja un curso por username
    @DeleteMapping("/username/{username}/cursos/{cursoId}")
    public ResponseEntity<?> eliminarCursoInscrito(
            @PathVariable String username,
            @PathVariable Long cursoId) {

        Usuario usuario = usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        Curso curso = cursoRepository.findById(cursoId)
                .orElseThrow(() -> new IllegalArgumentException("Curso no encontrado"));

        if (!usuario.getCursos().contains(curso)) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "El usuario no está inscrito en el curso: " + curso.getNombre()));
        }

        usuario.getCursos().remove(curso);
        usuarioRepository.save(usuario);

        return ResponseEntity.ok(Map.of("message", "Curso eliminado correctamente"));
    }

    // Eliminar horario inscrito por username
    @DeleteMapping("/username/{username}/horarios/{horarioId}")
    public ResponseEntity<?> eliminarHorarioInscrito(
            @PathVariable String username,
            @PathVariable Long horarioId) {

        Usuario usuario = usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        Horario horario = horarioRepository.findById(horarioId)
                .orElseThrow(() -> new IllegalArgumentException("Horario no encontrado"));

        if (!usuario.getHorariosInscritos().contains(horario)) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "El usuario no está inscrito en este horario"));
        }

        // quitar el horario del usuario
        usuario.getHorariosInscritos().remove(horario);

        // actualizar cupo
        if (horario.getCupoActual() > 0) {
            horario.setCupoActual(horario.getCupoActual() - 1);
        }

        usuarioRepository.save(usuario);
        horarioRepository.save(horario);

        return ResponseEntity.ok(Map.of("message", "Horario eliminado correctamente"));
    }
}
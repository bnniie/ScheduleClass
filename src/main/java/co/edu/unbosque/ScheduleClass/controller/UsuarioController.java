package co.edu.unbosque.ScheduleClass.controller;

import co.edu.unbosque.ScheduleClass.model.Usuario;
import co.edu.unbosque.ScheduleClass.model.Horario;
import co.edu.unbosque.ScheduleClass.repository.UsuarioRepository;
import co.edu.unbosque.ScheduleClass.repository.HorarioRepository;
import co.edu.unbosque.ScheduleClass.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UsuarioController {

    private final UsuarioService usuarioService;
    private final UsuarioRepository usuarioRepository;
    private final HorarioRepository horarioRepository;

    public UsuarioController(UsuarioService usuarioService,
                             UsuarioRepository usuarioRepository,
                             HorarioRepository horarioRepository) {
        this.usuarioService = usuarioService;
        this.usuarioRepository = usuarioRepository;
        this.horarioRepository = horarioRepository;
    }

    // Listar todos los usuarios
    @GetMapping
    public List<Usuario> getAllUsers() {
        return usuarioService.getAllUsers();
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
    public ResponseEntity<Usuario> inscribirHorarioPorUsername(
            @PathVariable String username,
            @PathVariable Long horarioId) {
        Usuario usuario = usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        if (!"USER".equalsIgnoreCase(usuario.getRole())) {
            throw new IllegalArgumentException("Solo los usuarios con rol USER pueden inscribirse en horarios.");
        }

        Horario horario = horarioRepository.findById(horarioId)
                .orElseThrow(() -> new IllegalArgumentException("Horario no encontrado"));

        if (horario.getCupoActual() >= horario.getCupoMaximo()) {
            throw new IllegalArgumentException("El horario está lleno");
        }

        usuario.getHorariosInscritos().add(horario);
        horario.setCupoActual(horario.getCupoActual() + 1);

        usuarioRepository.save(usuario);
        horarioRepository.save(horario);

        return ResponseEntity.ok(usuario);
    }

    // Listar horarios inscritos de un usuario por ID
    @GetMapping("/{usuarioId}/horarios")
    public ResponseEntity<List<Horario>> getHorariosInscritos(@PathVariable Long usuarioId) {
        Optional<Usuario> usuarioOpt = usuarioService.getUserById(usuarioId);
        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(usuarioOpt.get().getHorariosInscritos());
    }

    // Listar horarios inscritos de un usuario por username
    @GetMapping("/username/{username}/horarios")
    public ResponseEntity<List<Horario>> getHorariosInscritosPorUsername(@PathVariable String username) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByUsername(username);
        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(usuarioOpt.get().getHorariosInscritos());
    }
}
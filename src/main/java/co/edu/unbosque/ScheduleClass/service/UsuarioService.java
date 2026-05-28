package co.edu.unbosque.ScheduleClass.service;

import co.edu.unbosque.ScheduleClass.model.Usuario;
import co.edu.unbosque.ScheduleClass.model.Horario;
import co.edu.unbosque.ScheduleClass.repository.UsuarioRepository;
import co.edu.unbosque.ScheduleClass.repository.HorarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final HorarioRepository horarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository, HorarioRepository horarioRepository) {
        this.usuarioRepository = usuarioRepository;
        this.horarioRepository = horarioRepository;
    }

    // CRUD básicos
    public java.util.List<Usuario> getAllUsers() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> getUserById(Long id) {
        return usuarioRepository.findById(id);
    }

    public Usuario createUser(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public void deleteUser(Long id) {
        usuarioRepository.deleteById(id);
    }

    // Inscribir usuario en un horario
    @Transactional
    public Usuario inscribirHorario(Long usuarioId, Long horarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        if (!"USER".equalsIgnoreCase(usuario.getRole())) {
            throw new IllegalArgumentException("Solo los usuarios con rol USER pueden inscribirse en horarios.");
        }

        Horario horario = horarioRepository.findById(horarioId)
                .orElseThrow(() -> new IllegalArgumentException("Horario no encontrado"));

        if (horario.getCupoActual() >= horario.getCupoMaximo()) {
            throw new IllegalArgumentException("El horario está lleno");
        }

        // Validar choques de horarios por día y franja horaria
        for (Horario h : usuario.getHorariosInscritos()) {
            if (h.getDiaSemana().equalsIgnoreCase(horario.getDiaSemana())) {
                boolean choque = !(horario.getHoraFin().compareTo(h.getHoraInicio()) <= 0 ||
                                   horario.getHoraInicio().compareTo(h.getHoraFin()) >= 0);
                if (choque) {
                    throw new IllegalArgumentException("El usuario ya tiene un horario en esa franja");
                }
            }
        }

        usuario.getHorariosInscritos().add(horario);
        horario.setCupoActual(horario.getCupoActual() + 1);

        usuarioRepository.save(usuario);
        horarioRepository.save(horario);

        return usuario;
    }
}
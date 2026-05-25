package co.edu.unbosque.ScheduleClass.repository;

import co.edu.unbosque.ScheduleClass.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByUsername(String username);
}

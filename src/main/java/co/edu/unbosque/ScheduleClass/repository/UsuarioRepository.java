// Autor: Paula Guerrero
// Fecha: 25/05/26
// Descripción: Repositorio JPA para la entidad Usuario.
//              Proporciona acceso a las operaciones CRUD sobre la tabla 'usuario'
//              sin necesidad de implementar consultas manuales.
//              Extiende JpaRepository para heredar métodos como save, findAll, findById, deleteById, etc.

package co.edu.unbosque.ScheduleClass.repository;

import co.edu.unbosque.ScheduleClass.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByUsername(String username);

    long countByCursos_Id(Long cursoId);
}

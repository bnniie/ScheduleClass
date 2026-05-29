// Autor: Paula Guerrero
// Fecha: 25/05/26
// Descripción: Repositorio JPA para la entidad Docente.
//              Proporciona acceso a las operaciones CRUD sobre la tabla 'docente'
//              sin necesidad de implementar consultas manuales.
//              Extiende JpaRepository para heredar métodos como save, findAll, findById, deleteById, etc.

package co.edu.unbosque.ScheduleClass.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import co.edu.unbosque.ScheduleClass.model.Docente;

public interface DocenteRepository extends JpaRepository<Docente, Long> {
    Optional<Docente> findByUsuario_Username(String username);
}
// Autor: Paula Guerrero
// Fecha: 25/05/26
// Descripción: Repositorio JPA para la entidad Horario.
//              Proporciona acceso a las operaciones CRUD sobre la tabla 'horario'
//              sin necesidad de implementar consultas manuales.
//              Extiende JpaRepository para heredar métodos como save, findAll, findById, deleteById, etc.

package co.edu.unbosque.ScheduleClass.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import co.edu.unbosque.ScheduleClass.model.Horario;

public interface HorarioRepository extends JpaRepository<Horario, Long> {
}
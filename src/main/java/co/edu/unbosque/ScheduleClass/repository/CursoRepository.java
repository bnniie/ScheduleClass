// Autor: Paula Guerrero
// Fecha: 25/05/26
// Descripción: Repositorio JPA para la entidad Curso.
//              Proporciona acceso a las operaciones CRUD sobre la tabla 'curso'
//              sin necesidad de implementar consultas manuales.
//              Extiende JpaRepository para heredar métodos como save, findAll, findById, deleteById, etc.

package co.edu.unbosque.ScheduleClass.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import co.edu.unbosque.ScheduleClass.model.Curso;

public interface CursoRepository extends JpaRepository<Curso, Long> {
}

package co.edu.unbosque.ScheduleClass.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import co.edu.unbosque.ScheduleClass.model.Curso;

public interface CursoRepository extends JpaRepository<Curso, Long> {
}

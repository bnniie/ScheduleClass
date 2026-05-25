package co.edu.unbosque.ScheduleClass.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import co.edu.unbosque.ScheduleClass.model.Docente;

public interface DocenteRepository extends JpaRepository<Docente, Long> {
}
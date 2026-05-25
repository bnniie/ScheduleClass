package co.edu.unbosque.ScheduleClass.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import co.edu.unbosque.ScheduleClass.model.Aula;

public interface AulaRepository extends JpaRepository<Aula, Long> {
}
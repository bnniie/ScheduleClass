package co.edu.unbosque.ScheduleClass.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import co.edu.unbosque.ScheduleClass.model.Horario;

public interface HorarioRepository extends JpaRepository<Horario, Long> {
}
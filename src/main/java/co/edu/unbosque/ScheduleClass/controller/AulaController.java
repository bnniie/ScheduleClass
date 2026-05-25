package co.edu.unbosque.ScheduleClass.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import co.edu.unbosque.ScheduleClass.model.Aula;
import co.edu.unbosque.ScheduleClass.repository.AulaRepository;

@RestController
@RequestMapping("/api/aulas")
public class AulaController {

    private final AulaRepository aulaRepository;

    public AulaController(AulaRepository aulaRepository) {
        this.aulaRepository = aulaRepository;
    }

    @GetMapping
    public List<Aula> listar() {
        return aulaRepository.findAll();
    }

    @PostMapping
    public Aula crear(@RequestBody Aula aula) {
        return aulaRepository.save(aula);
    }
}
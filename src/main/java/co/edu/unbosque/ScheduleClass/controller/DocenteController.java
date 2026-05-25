package co.edu.unbosque.ScheduleClass.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import co.edu.unbosque.ScheduleClass.model.Docente;
import co.edu.unbosque.ScheduleClass.repository.DocenteRepository;

@RestController
@RequestMapping("/api/docentes")
public class DocenteController {

    private final DocenteRepository docenteRepository;

    public DocenteController(DocenteRepository docenteRepository) {
        this.docenteRepository = docenteRepository;
    }

    @GetMapping
    public List<Docente> listar() {
        return docenteRepository.findAll();
    }

    @PostMapping
    public Docente crear(@RequestBody Docente docente) {
        return docenteRepository.save(docente);
    }
}
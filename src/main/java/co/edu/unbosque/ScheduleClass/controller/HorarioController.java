package co.edu.unbosque.ScheduleClass.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import co.edu.unbosque.ScheduleClass.model.Horario;
import co.edu.unbosque.ScheduleClass.service.HorarioService;

@RestController
@RequestMapping("/api/horarios")
public class HorarioController {

    private final HorarioService horarioService;

    public HorarioController(HorarioService horarioService) {
        this.horarioService = horarioService;
    }

    @GetMapping
    public List<Horario> listar() {
        return horarioService.listar();
    }

    @PostMapping
    public Horario crear(@RequestBody Horario horario) {
        return horarioService.crearHorario(horario);
    }
}
package co.edu.unbosque.ScheduleClass.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import co.edu.unbosque.ScheduleClass.dto.DatosPlanificadorDTO;
import co.edu.unbosque.ScheduleClass.model.Curso;
import co.edu.unbosque.ScheduleClass.model.Docente;
import co.edu.unbosque.ScheduleClass.model.Aula;
import co.edu.unbosque.ScheduleClass.service.PlanificadorService;
import co.edu.unbosque.ScheduleClass.repository.CursoRepository;
import co.edu.unbosque.ScheduleClass.repository.DocenteRepository;
import co.edu.unbosque.ScheduleClass.repository.AulaRepository;

@RestController
@RequestMapping("/api/planificador")
public class PlanificadorController {

    private final PlanificadorService planificadorService;
    private final CursoRepository cursoRepository;
    private final DocenteRepository docenteRepository;
    private final AulaRepository aulaRepository;

    public PlanificadorController(PlanificadorService planificadorService,
                                  CursoRepository cursoRepository,
                                  DocenteRepository docenteRepository,
                                  AulaRepository aulaRepository) {
        this.planificadorService = planificadorService;
        this.cursoRepository = cursoRepository;
        this.docenteRepository = docenteRepository;
        this.aulaRepository = aulaRepository;
    }

    @PostMapping
    public ResponseEntity<String> generar(@RequestBody DatosPlanificadorDTO datos) {
        List<Curso> cursos = cursoRepository.findAllById(datos.getCursos());
        List<Docente> docentes = docenteRepository.findAllById(datos.getDocentes());
        List<Aula> aulas = aulaRepository.findAllById(datos.getAulas());

        planificadorService.generarHorarios(cursos, docentes, aulas);

        return ResponseEntity.ok("Horarios generados exitosamente");
    }
}
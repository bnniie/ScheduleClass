package co.edu.unbosque.ScheduleClass.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;

import co.edu.unbosque.ScheduleClass.model.*;
import co.edu.unbosque.ScheduleClass.service.PlanificadorService;

@RestController
@RequestMapping("/api/planificador")
public class PlanificadorController {

    private final PlanificadorService planificadorService;

    public PlanificadorController(PlanificadorService planificadorService) {
        this.planificadorService = planificadorService;
    }

    @PostMapping
    public String generar(@RequestBody DatosPlanificacion datos) {
        planificadorService.generarHorarios(datos.getCursos(), datos.getDocentes(), datos.getAulas());
        return "Horarios generados exitosamente";
    }
}

// Clase auxiliar para recibir datos
class DatosPlanificacion {
    private List<Curso> cursos;
    private List<Docente> docentes;
    private List<Aula> aulas;

    public List<Curso> getCursos() { return cursos; }
    public void setCursos(List<Curso> cursos) { this.cursos = cursos; }

    public List<Docente> getDocentes() { return docentes; }
    public void setDocentes(List<Docente> docentes) { this.docentes = docentes; }

    public List<Aula> getAulas() { return aulas; }
    public void setAulas(List<Aula> aulas) { this.aulas = aulas; }
}
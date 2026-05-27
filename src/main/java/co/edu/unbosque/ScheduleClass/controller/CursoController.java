package co.edu.unbosque.ScheduleClass.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import co.edu.unbosque.ScheduleClass.model.Curso;
import co.edu.unbosque.ScheduleClass.repository.CursoRepository;

@RestController
@RequestMapping("/api/cursos")
public class CursoController {

    private final CursoRepository cursoRepository;

    public CursoController(CursoRepository cursoRepository) {
        this.cursoRepository = cursoRepository;
    }

    // Listar todos los cursos
    @GetMapping
    public List<Curso> listar() {
        return cursoRepository.findAll();
    }

    // Crear curso
    @PostMapping
    public Curso crear(@RequestBody Curso curso) {
        return cursoRepository.save(curso);
    }

    // Obtener curso por ID
    @GetMapping("/{id}")
    public ResponseEntity<Curso> obtener(@PathVariable Long id) {
        Optional<Curso> curso = cursoRepository.findById(id);
        return curso.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Actualizar curso
    @PutMapping("/{id}")
    public ResponseEntity<Curso> actualizar(@PathVariable Long id, @RequestBody Curso datos) {
        return cursoRepository.findById(id)
            .map(curso -> {
                curso.setNombre(datos.getNombre());
                curso.setSesionesPorSemana(datos.getSesionesPorSemana());
                curso.setCapacidadMaxima(datos.getCapacidadMaxima());
                curso.setCapacidadMinima(datos.getCapacidadMinima());
                Curso actualizado = cursoRepository.save(curso);
                return ResponseEntity.ok(actualizado);
            })
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Eliminar curso
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (!cursoRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        cursoRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
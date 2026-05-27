package co.edu.unbosque.ScheduleClass.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import co.edu.unbosque.ScheduleClass.model.Aula;
import co.edu.unbosque.ScheduleClass.repository.AulaRepository;

@RestController
@RequestMapping("/api/aulas")
public class AulaController {

    private final AulaRepository aulaRepository;

    public AulaController(AulaRepository aulaRepository) {
        this.aulaRepository = aulaRepository;
    }

    // Listar todas las aulas
    @GetMapping
    public List<Aula> listar() {
        return aulaRepository.findAll();
    }

    // Crear aula
    @PostMapping
    public Aula crear(@RequestBody Aula aula) {
        return aulaRepository.save(aula);
    }

    // Obtener aula por ID
    @GetMapping("/{id}")
    public ResponseEntity<Aula> obtener(@PathVariable Long id) {
        Optional<Aula> aula = aulaRepository.findById(id);
        return aula.map(ResponseEntity::ok)
                   .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Actualizar aula
    @PutMapping("/{id}")
    public ResponseEntity<Aula> actualizar(@PathVariable Long id, @RequestBody Aula datos) {
        return aulaRepository.findById(id)
            .map(aula -> {
                aula.setNombre(datos.getNombre());
                aula.setCapacidad(datos.getCapacidad());
                aula.setComputadores(datos.isComputadores());
                aula.setSillasMoviles(datos.isSillasMoviles());
                Aula actualizado = aulaRepository.save(aula);
                return ResponseEntity.ok(actualizado);
            })
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Eliminar aula
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (!aulaRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        aulaRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
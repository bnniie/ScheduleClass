package co.edu.unbosque.ScheduleClass.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import co.edu.unbosque.ScheduleClass.model.Docente;
import co.edu.unbosque.ScheduleClass.model.Usuario;
import co.edu.unbosque.ScheduleClass.repository.DocenteRepository;
import co.edu.unbosque.ScheduleClass.repository.UsuarioRepository;

@RestController
@RequestMapping("/api/docentes")
public class DocenteController {

    private final DocenteRepository docenteRepository;
    private final UsuarioRepository usuarioRepository;

    public DocenteController(DocenteRepository docenteRepository, UsuarioRepository usuarioRepository) {
        this.docenteRepository = docenteRepository;
        this.usuarioRepository = usuarioRepository;
    }

    @GetMapping
    public List<Docente> listar() {
        return docenteRepository.findAll();
    }

    @PostMapping
    public Docente crear(@RequestBody Docente docente) {
        System.out.println("Docente recibido: " + docente);

        Usuario usuario = usuarioRepository.findById(docente.getUsuario().getId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        System.out.println("Usuario encontrado: " + usuario.getUsername() + " con rol " + usuario.getRole());

        usuario.setRole("DOCENTE");
        usuarioRepository.save(usuario);

        docente.setUsuario(usuario);
        Docente saved = docenteRepository.save(docente);

        System.out.println("Docente guardado: " + saved.getId() + " vinculado a usuario " + saved.getUsuario().getUsername());

        return saved;
    }

    @PutMapping("/{id}/estado")
    public Docente actualizarEstado(@PathVariable Long id, @RequestBody boolean nuevoEstado) {
        Docente docente = docenteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Docente no encontrado"));
        docente.setState(nuevoEstado);
        return docenteRepository.save(docente);
    }
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        Docente docente = docenteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Docente no encontrado"));
        docenteRepository.delete(docente);
        System.out.println("Docente eliminado con id: " + id);
    }
}
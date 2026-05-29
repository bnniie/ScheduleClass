// Autor: Paula Guerrero
// Fecha: 29/05/26
// Descripción: Controlador REST para la gestión de docentes en el sistema ScheduleClass.
//              Proporciona operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre la entidad Docente.

package co.edu.unbosque.ScheduleClass.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import co.edu.unbosque.ScheduleClass.dto.CursoAsignadoDTO;
import co.edu.unbosque.ScheduleClass.dto.DocenteDTO;
import co.edu.unbosque.ScheduleClass.dto.HorarioDTO;
import co.edu.unbosque.ScheduleClass.dto.CursoHorarioDTO;
import co.edu.unbosque.ScheduleClass.model.Docente;
import co.edu.unbosque.ScheduleClass.model.Horario;
import co.edu.unbosque.ScheduleClass.model.Usuario;
import co.edu.unbosque.ScheduleClass.repository.DocenteRepository;
import co.edu.unbosque.ScheduleClass.repository.UsuarioRepository;
import co.edu.unbosque.ScheduleClass.service.DocenteService;

@RestController
@RequestMapping("/api/docentes")
public class DocenteController {

    private final DocenteRepository docenteRepository;
    private final UsuarioRepository usuarioRepository;
    private final DocenteService docenteService;

    public DocenteController(DocenteRepository docenteRepository,
                             UsuarioRepository usuarioRepository,
                             DocenteService docenteService) {
        this.docenteRepository = docenteRepository;
        this.usuarioRepository = usuarioRepository;
        this.docenteService = docenteService;
    }

    // Listar docentes como DTO
    @GetMapping
    public List<DocenteDTO> getAllDocentes() {
        return docenteService.getAllDocentes().stream()
                .map(d -> new DocenteDTO(
                        d.getId(),
                        d.getUsuario().getUsername(),
                        d.getDedicacion(),
                        d.getRestricciones(),
                        d.getDisponibilidad(),
                        d.isState()
                ))
                .collect(Collectors.toList());
    }

    // Crear docente
    @PostMapping
    public Docente crear(@RequestBody Docente docente) {
        Usuario usuario = usuarioRepository.findById(docente.getUsuario().getId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        usuario.setRole("DOCENTE");
        usuarioRepository.save(usuario);

        docente.setUsuario(usuario);
        return docenteRepository.save(docente);
    }
    
    // Actualizar estado inactivo/activo
    @PutMapping("/{id}/estado")
    public Docente actualizarEstado(@PathVariable Long id, @RequestBody Map<String, Boolean> body) {
        Docente docente = docenteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Docente no encontrado"));
        docente.setState(body.get("state"));
        return docenteRepository.save(docente);
    }

    // Eliminar docente
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        Docente docente = docenteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Docente no encontrado"));

        Usuario usuario = docente.getUsuario();
        usuario.setRole("USER");
        usuarioRepository.save(usuario);

        docenteRepository.delete(docente);
        System.out.println("Docente eliminado con id: " + id + " y usuario " + usuario.getUsername() + " revertido a USER");
    }

    // Cursos con días agrupados
    @GetMapping("/username/{username}/cursos-horarios")
    public List<CursoHorarioDTO> listarCursosConHorarios(@PathVariable String username) {
        Docente docente = docenteRepository.findByUsuario_Username(username)
                .orElseThrow(() -> new RuntimeException("Docente no encontrado"));

        return docente.getHorarios().stream()
                .collect(Collectors.groupingBy(Horario::getCurso))
                .entrySet().stream()
                .map(entry -> {
                    var curso = entry.getKey();
                    var horarios = entry.getValue();

                    List<String> dias = horarios.stream()
                            .map(Horario::getDiaSemana)
                            .distinct()
                            .collect(Collectors.toList());

                    String horaInicio = horarios.get(0).getHoraInicio();
                    String horaFin = horarios.get(0).getHoraFin();
                    String aulaNombre = horarios.get(0).getAula().getNombre();

                    return new CursoHorarioDTO(
                            curso.getId(),
                            curso.getNombre(),
                            curso.getCodigo(),
                            dias,
                            horaInicio,
                            horaFin,
                            aulaNombre
                    );
                })
                .collect(Collectors.toList());
    }

    // Mostrar horarios por docente
    @GetMapping("/{id}/horarios")
    public List<HorarioDTO> listarHorariosPorDocenteId(@PathVariable Long id) {
        Docente docente = docenteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Docente no encontrado"));

        return docente.getHorarios().stream()
                .map(h -> new HorarioDTO(
                        h.getId(),
                        h.getCurso().getNombre(),
                        h.getDiaSemana(),
                        h.getHoraInicio(),
                        h.getHoraFin(),
                        h.getAula().getNombre()
                ))
                .collect(Collectors.toList());
    }
}
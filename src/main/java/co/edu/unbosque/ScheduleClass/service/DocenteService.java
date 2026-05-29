// Autor: Paula Guerrero
// Fecha: 25/05/26
// Descripción: Servicio de negocio para la gestión de docentes en el sistema ScheduleClass.
//              Encapsula la lógica de acceso a datos y proporciona operaciones CRUD

package co.edu.unbosque.ScheduleClass.service;

import co.edu.unbosque.ScheduleClass.model.Docente;
import co.edu.unbosque.ScheduleClass.repository.DocenteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DocenteService {

    private final DocenteRepository docenteRepository;

    // CRUD básicos
    public DocenteService(DocenteRepository docenteRepository) {
        this.docenteRepository = docenteRepository;
    }

    public List<Docente> getAllDocentes() {
        return docenteRepository.findAll();
    }

    public Docente saveDocente(Docente docente) {
        return docenteRepository.save(docente);
    }

    public void deleteDocente(Long id) {
        docenteRepository.deleteById(id);
    }

    public Docente getDocenteById(Long id) {
        return docenteRepository.findById(id).orElse(null);
    }
}
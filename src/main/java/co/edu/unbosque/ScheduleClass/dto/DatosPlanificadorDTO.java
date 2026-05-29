// Autor: Paula Guerrero
// Fecha: 26/05/26
// Descripción: Objeto de Transferencia de Datos (DTO) para representar
//              la información básica del planificador.
//              Se utiliza para enviar datos limpios y relevantes al frontend,
//              evitando exponer toda la entidad Curso y sus relaciones internas.

package co.edu.unbosque.ScheduleClass.dto;

import java.util.List;

public class DatosPlanificadorDTO {

    private List<Long> cursos;
    private List<Long> docentes;
    private List<Long> aulas;

    // Getters y Setters
    public List<Long> getCursos() {
        return cursos;
    }

    public void setCursos(List<Long> cursos) {
        this.cursos = cursos;
    }

    public List<Long> getDocentes() {
        return docentes;
    }

    public void setDocentes(List<Long> docentes) {
        this.docentes = docentes;
    }

    public List<Long> getAulas() {
        return aulas;
    }

    public void setAulas(List<Long> aulas) {
        this.aulas = aulas;
    }
}
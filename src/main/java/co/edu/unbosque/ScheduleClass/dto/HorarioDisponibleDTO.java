package co.edu.unbosque.ScheduleClass.dto;

import java.time.LocalDateTime;

public class HorarioDisponibleDTO {
    private Long id;
    private String curso;
    private String docente;   // username del usuario asociado al docente
    private String aula;
    private LocalDateTime inicio;
    private LocalDateTime fin;
    private int cupoActual;
    private int cupoMaximo;
    private double porcentajeOcupacion;

    public HorarioDisponibleDTO(Long id, String curso, String docente, String aula,
                                LocalDateTime inicio, LocalDateTime fin,
                                int cupoActual, int cupoMaximo) {
        this.id = id;
        this.curso = (curso != null) ? curso : "Sin curso";
        this.docente = (docente != null) ? docente : "Sin docente";
        this.aula = (aula != null) ? aula : "Sin aula";
        this.inicio = inicio;
        this.fin = fin;
        this.cupoActual = cupoActual;
        this.cupoMaximo = cupoMaximo;
        this.porcentajeOcupacion = (cupoMaximo > 0) ? ((double)cupoActual / cupoMaximo) * 100 : 0;
    }

    // Getters
    public Long getId() { return id; }
    public String getCurso() { return curso; }
    public String getDocente() { return docente; }
    public String getAula() { return aula; }
    public LocalDateTime getInicio() { return inicio; }
    public LocalDateTime getFin() { return fin; }
    public int getCupoActual() { return cupoActual; }
    public int getCupoMaximo() { return cupoMaximo; }
    public double getPorcentajeOcupacion() { return porcentajeOcupacion; }
}
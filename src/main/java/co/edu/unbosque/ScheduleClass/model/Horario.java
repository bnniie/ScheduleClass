package co.edu.unbosque.ScheduleClass.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Horario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Relación con Docente
    @ManyToOne
    @JoinColumn(name = "docente_id")
    private Docente docente;

    // Relación con Curso
    @ManyToOne
    @JoinColumn(name = "curso_id")
    private Curso curso;

    // Relación con Aula
    @ManyToOne
    @JoinColumn(name = "aula_id")
    private Aula aula;

    // Esquema semanal
    private String diaSemana; 
    private String horaInicio;
    private String horaFin;

    private int cupoMaximo;
    private int cupoActual;

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Docente getDocente() { return docente; }
    public void setDocente(Docente docente) { this.docente = docente; }

    public Curso getCurso() { return curso; }
    public void setCurso(Curso curso) { this.curso = curso; }

    public Aula getAula() { return aula; }
    public void setAula(Aula aula) { this.aula = aula; }

    public String getDiaSemana() { return diaSemana; }
    public void setDiaSemana(String diaSemana) { this.diaSemana = diaSemana; }

    public String getHoraInicio() { return horaInicio; }
    public void setHoraInicio(String horaInicio) { this.horaInicio = horaInicio; }

    public String getHoraFin() { return horaFin; }
    public void setHoraFin(String horaFin) { this.horaFin = horaFin; }

    public int getCupoMaximo() { return cupoMaximo; }
    public void setCupoMaximo(int cupoMaximo) { this.cupoMaximo = cupoMaximo; }

    public int getCupoActual() { return cupoActual; }
    public void setCupoActual(int cupoActual) { this.cupoActual = cupoActual; }
}
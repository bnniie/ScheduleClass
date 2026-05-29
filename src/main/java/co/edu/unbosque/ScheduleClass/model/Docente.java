// Autor: Paula Guerrero
// Fecha: 25/05/26
// Descripción: Entidad JPA que representa un docente dentro del sistema ScheduleClass.
//              Contiene atributos relacionados con la capacidad y características físicas,
//              y se utiliza para persistir información en la base de datos.

package co.edu.unbosque.ScheduleClass.model;

import java.util.List;

import jakarta.persistence.*;

@Entity
public class Docente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    private String dedicacion;
    private String restricciones;
    private String disponibilidad;

    private boolean state = true;

    @OneToMany(mappedBy = "docente", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Curso> cursos;

    @OneToMany(mappedBy = "docente", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Horario> horarios;

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }

    public String getDedicacion() { return dedicacion; }
    public void setDedicacion(String dedicacion) { this.dedicacion = dedicacion; }

    public String getRestricciones() { return restricciones; }
    public void setRestricciones(String restricciones) { this.restricciones = restricciones; }

    public String getDisponibilidad() { return disponibilidad; }
    public void setDisponibilidad(String disponibilidad) { this.disponibilidad = disponibilidad; }

    public boolean isState() { return state; }
    public void setState(boolean state) { this.state = state; }

    public List<Curso> getCursos() { return cursos; }
    public void setCursos(List<Curso> cursos) { this.cursos = cursos; }

    public List<Horario> getHorarios() { return horarios; }
    public void setHorarios(List<Horario> horarios) { this.horarios = horarios; }
}
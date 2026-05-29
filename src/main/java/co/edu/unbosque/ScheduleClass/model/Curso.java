// Autor: Paula Guerrero
// Fecha: 25/05/26
// Descripción: Entidad JPA que representa un curso dentro del sistema ScheduleClass.
//              Contiene atributos relacionados con la capacidad y características físicas,
//              y se utiliza para persistir información en la base de datos.

package co.edu.unbosque.ScheduleClass.model;

import jakarta.persistence.*;

@Entity
@Table(name = "curso")
public class Curso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private int sesionesPorSemana; 
    private int capacidadMaxima;
    private int capacidadMinima;
    private int creditos;

    private String codigo;

    @ManyToOne
    @JoinColumn(name = "docente_id")
    private Docente docente;

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public int getSesionesPorSemana() { return sesionesPorSemana; }
    public void setSesionesPorSemana(int sesionesPorSemana) { this.sesionesPorSemana = sesionesPorSemana; }

    public int getCapacidadMaxima() { return capacidadMaxima; }
    public void setCapacidadMaxima(int capacidadMaxima) { this.capacidadMaxima = capacidadMaxima; }

    public int getCapacidadMinima() { return capacidadMinima; }
    public void setCapacidadMinima(int capacidadMinima) { this.capacidadMinima = capacidadMinima; }

    public int getCreditos() { return creditos; }
    public void setCreditos(int creditos) { this.creditos = creditos; }

    public String getCodigo() { return codigo; }
    public void setCodigo(String codigo) { this.codigo = codigo; }

    public Docente getDocente() { return docente; }
    public void setDocente(Docente docente) { this.docente = docente; }
}
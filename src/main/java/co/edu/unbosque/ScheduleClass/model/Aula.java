// Autor: Paula Guerrero
// Fecha: 25/05/26
// Descripción: Entidad JPA que representa un aula dentro del sistema ScheduleClass.
//              Contiene atributos relacionados con la capacidad y características físicas,
//              y se utiliza para persistir información en la base de datos.

package co.edu.unbosque.ScheduleClass.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Aula {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    // Capacidad real del aula
    private int capacidad;

    private int capacidadMaxima = 40;
    private int capacidadMinima = 10;

    private boolean computadores;
    private boolean sillasMoviles;

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public int getCapacidad() { return capacidad; }
    public void setCapacidad(int capacidad) { this.capacidad = capacidad; }

    public int getCapacidadMaxima() { return capacidadMaxima; }
    public void setCapacidadMaxima(int capacidadMaxima) { this.capacidadMaxima = capacidadMaxima; }

    public int getCapacidadMinima() { return capacidadMinima; }
    public void setCapacidadMinima(int capacidadMinima) { this.capacidadMinima = capacidadMinima; }

    public boolean isComputadores() { return computadores; }
    public void setComputadores(boolean computadores) { this.computadores = computadores; }

    public boolean isSillasMoviles() { return sillasMoviles; }
    public void setSillasMoviles(boolean sillasMoviles) { this.sillasMoviles = sillasMoviles; }
}
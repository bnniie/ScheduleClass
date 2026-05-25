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
    private int capacidad;
    private boolean computadores;
    private boolean sillasMoviles;

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public int getCapacidad() { return capacidad; }
    public void setCapacidad(int capacidad) { this.capacidad = capacidad; }

    public boolean isComputadores() { return computadores; }
    public void setComputadores(boolean computadores) { this.computadores = computadores; }

    public boolean isSillasMoviles() { return sillasMoviles; }
    public void setSillasMoviles(boolean sillasMoviles) { this.sillasMoviles = sillasMoviles; }
}
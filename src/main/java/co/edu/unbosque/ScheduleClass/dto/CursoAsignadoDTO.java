// Autor: Paula Guerrero
// Fecha: 27/05/26
// Descripción: Objeto de Transferencia de Datos (DTO) para representar
//              la información básica de un curso asignado a un estudiante.
//              Se utiliza para enviar datos limpios y relevantes al frontend,
//              evitando exponer toda la entidad Curso y sus relaciones internas.

package co.edu.unbosque.ScheduleClass.dto;

public class CursoAsignadoDTO {
    private Long id;
    private String nombre;
    private String codigo;
    private int sesionesPorSemana;

    // Constructor
    public CursoAsignadoDTO(Long id, String nombre, String codigo, int sesionesPorSemana) {
        this.id = id;
        this.nombre = nombre;
        this.codigo = codigo;
        this.sesionesPorSemana = sesionesPorSemana;
    }

    // Getters
    public Long getId() { return id; }
    public String getNombre() { return nombre; }
    public String getCodigo() { return codigo; }
    public int getSesionesPorSemana() { return sesionesPorSemana; }
}
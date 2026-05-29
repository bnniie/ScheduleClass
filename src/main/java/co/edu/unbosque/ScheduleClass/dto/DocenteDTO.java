// Autor: Paula Guerrero
// Fecha: 29/05/26
// Descripción: Objeto de Transferencia de Datos (DTO) para representar
//              la información básica de un docente.
//              Se utiliza para enviar datos limpios y relevantes al frontend,
//              evitando exponer toda la entidad Curso y sus relaciones internas.

package co.edu.unbosque.ScheduleClass.dto;

public class DocenteDTO {
    private Long id;
    private String username;
    private String dedicacion;
    private String restricciones;
    private String disponibilidad;
    private boolean state;

    // Constructor
    public DocenteDTO(Long id, String username,
                      String dedicacion, String restricciones,
                      String disponibilidad, boolean state) {
        this.id = id;
        this.username = username;
        this.dedicacion = dedicacion;
        this.restricciones = restricciones;
        this.disponibilidad = disponibilidad;
        this.state = state;
    }

    // Getters
    public Long getId() { return id; }
    public String getUsername() { return username; }
    public String getDedicacion() { return dedicacion; }
    public String getRestricciones() { return restricciones; }
    public String getDisponibilidad() { return disponibilidad; }
    public boolean isState() { return state; }
}
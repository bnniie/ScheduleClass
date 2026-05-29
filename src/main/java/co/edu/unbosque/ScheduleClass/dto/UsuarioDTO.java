// Autor: Paula Guerrero
// Fecha: 27/05/26
// Descripción: Objeto de Transferencia de Datos (DTO) para representar
//              la información básica de un usuario.
//              Se utiliza para enviar datos limpios y relevantes al frontend,
//              evitando exponer toda la entidad Curso y sus relaciones internas.

package co.edu.unbosque.ScheduleClass.dto;

public class UsuarioDTO {
    private Long id;
    private String username;
    private String role;

    // Constructor
    public UsuarioDTO(Long id, String username, String role) {
        this.id = id;
        this.username = username;
        this.role = role;
    }

    // Getters
    public Long getId() { return id; }
    public String getUsername() { return username; }
    public String getRole() { return role; }
}
package co.edu.unbosque.ScheduleClass.dto;

public class UsuarioInscritoDTO {
    private Long id;
    private String nombre;
    private String username;
    private String email;
    private String role;
    private String cursoNombre;

    public UsuarioInscritoDTO(Long id, String nombre, String username, String email, String role, String cursoNombre) {
        this.id = id;
        this.nombre = nombre;
        this.username = username;
        this.email = email;
        this.role = role;
        this.cursoNombre = cursoNombre;
    }

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getCursoNombre() { return cursoNombre; }
    public void setCursoNombre(String cursoNombre) { this.cursoNombre = cursoNombre; }
}
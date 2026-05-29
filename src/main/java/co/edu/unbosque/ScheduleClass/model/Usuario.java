// Autor: Paula Guerrero
// Fecha: 25/05/26
// Descripción: Entidad JPA que representa un usuario dentro del sistema ScheduleClass.
//              Contiene atributos relacionados con la capacidad y características físicas,
//              y se utiliza para persistir información en la base de datos.

package co.edu.unbosque.ScheduleClass.model;

import java.util.List;
import jakarta.persistence.*;

@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role; // ADMIN o USER
    
    @ManyToMany
    @JoinTable(
        name = "usuario_horarios",
        joinColumns = @JoinColumn(name = "usuario_id"),
        inverseJoinColumns = @JoinColumn(name = "horario_id")
    )
    private List<Horario> horariosInscritos;

    @ManyToMany
    @JoinTable(
        name = "usuario_cursos",
        joinColumns = @JoinColumn(name = "usuario_id"),
        inverseJoinColumns = @JoinColumn(name = "curso_id")
    )
    private List<Curso> cursos;

    // Getters y setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public List<Horario> getHorariosInscritos() { return horariosInscritos; }
    public void setHorariosInscritos(List<Horario> horariosInscritos) { this.horariosInscritos = horariosInscritos; }

    public List<Curso> getCursos() { return cursos; }
    public void setCursos(List<Curso> cursos) { this.cursos = cursos; }
}
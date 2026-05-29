// Autor: Paula Guerrero
// Fecha: 27/05/26
// Descripción: Objeto de Transferencia de Datos (DTO) para representar
//              la información básica de un curso con relacion al horario.
//              Se utiliza para enviar datos limpios y relevantes al frontend,
//              evitando exponer toda la entidad Curso y sus relaciones internas.

package co.edu.unbosque.ScheduleClass.dto;

import java.util.List;

public class CursoHorarioDTO {
    private Long id;
    private String nombre;
    private String codigo;
    private List<String> dias; // lista de días en que se dicta
    private String horaInicio;
    private String horaFin;
    private String aulaNombre;

    // Constructor
    public CursoHorarioDTO(Long id, String nombre, String codigo,
                           List<String> dias, String horaInicio,
                           String horaFin, String aulaNombre) {
        this.id = id;
        this.nombre = nombre;
        this.codigo = codigo;
        this.dias = dias;
        this.horaInicio = horaInicio;
        this.horaFin = horaFin;
        this.aulaNombre = aulaNombre;
    }

    // Getters
    public Long getId() { return id; }
    public String getNombre() { return nombre; }
    public String getCodigo() { return codigo; }
    public List<String> getDias() { return dias; }
    public String getHoraInicio() { return horaInicio; }
    public String getHoraFin() { return horaFin; }
    public String getAulaNombre() { return aulaNombre; }
}
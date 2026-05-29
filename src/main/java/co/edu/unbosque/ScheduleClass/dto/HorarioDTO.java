// Autor: Paula Guerrero
// Fecha: 28/05/26
// Descripción: Objeto de Transferencia de Datos (DTO) para representar
//              la información básica de un horario.
//              Se utiliza para enviar datos limpios y relevantes al frontend,
//              evitando exponer toda la entidad Curso y sus relaciones internas.

package co.edu.unbosque.ScheduleClass.dto;

public class HorarioDTO {
    private Long id;
    private String cursoNombre;
    private String diaSemana;
    private String horaInicio;
    private String horaFin;
    private String aulaNombre;

    // Constructor
    public HorarioDTO(Long id, String cursoNombre, String diaSemana,
                      String horaInicio, String horaFin, String aulaNombre) {
        this.id = id;
        this.cursoNombre = cursoNombre;
        this.diaSemana = diaSemana;
        this.horaInicio = horaInicio;
        this.horaFin = horaFin;
        this.aulaNombre = aulaNombre;
    }

    // Getters
    public Long getId() { return id; }
    public String getCursoNombre() { return cursoNombre; }
    public String getDiaSemana() { return diaSemana; }
    public String getHoraInicio() { return horaInicio; }
    public String getHoraFin() { return horaFin; }
    public String getAulaNombre() { return aulaNombre; }
}
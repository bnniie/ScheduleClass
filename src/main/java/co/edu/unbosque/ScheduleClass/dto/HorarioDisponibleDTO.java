package co.edu.unbosque.ScheduleClass.dto;

public class HorarioDisponibleDTO {
    private Long id;
    private String curso;
    private String docente;   // username del usuario asociado al docente
    private String aula;
    private String diaSemana;
    private String horaInicio;
    private String horaFin;
    private int cupoActual;
    private int cupoMaximo;
    private double porcentajeOcupacion;
    private boolean computadores;
    private boolean sillasMoviles;

    public HorarioDisponibleDTO(Long id, String curso, String docente, String aula,
                                String diaSemana, String horaInicio, String horaFin,
                                int cupoActual, int cupoMaximo,
                                boolean computadores, boolean sillasMoviles) {
        this.id = id;
        this.curso = (curso != null) ? curso : "Sin curso";
        this.docente = (docente != null) ? docente : "Sin docente";
        this.aula = (aula != null) ? aula : "Sin aula";
        this.diaSemana = (diaSemana != null) ? diaSemana : "Sin día";
        this.horaInicio = (horaInicio != null) ? horaInicio : "Sin hora";
        this.horaFin = (horaFin != null) ? horaFin : "Sin hora";
        this.cupoActual = cupoActual;
        this.cupoMaximo = cupoMaximo;
        this.porcentajeOcupacion = (cupoMaximo > 0) ? ((double)cupoActual / cupoMaximo) * 100 : 0;
        this.computadores = computadores;
        this.sillasMoviles = sillasMoviles;
    }

    // Getters
    public Long getId() { return id; }
    public String getCurso() { return curso; }
    public String getDocente() { return docente; }
    public String getAula() { return aula; }
    public String getDiaSemana() { return diaSemana; }
    public String getHoraInicio() { return horaInicio; }
    public String getHoraFin() { return horaFin; }
    public int getCupoActual() { return cupoActual; }
    public int getCupoMaximo() { return cupoMaximo; }
    public double getPorcentajeOcupacion() { return porcentajeOcupacion; }
    public boolean isComputadores() { return computadores; }
    public boolean isSillasMoviles() { return sillasMoviles; }
}
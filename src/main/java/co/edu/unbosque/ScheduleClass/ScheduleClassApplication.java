// Autor: Paula Guerrero
// Fecha: 25/05/26
// Descripción: Clase principal del sistema ScheduleClass.
//              Contiene el método main que inicializa y ejecuta la aplicación Spring Boot.
//              Sirve como punto de entrada para el framework, configurando automáticamente

package co.edu.unbosque.ScheduleClass;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ScheduleClassApplication {

	public static void main(String[] args) {
		SpringApplication.run(ScheduleClassApplication.class, args);
	}

}

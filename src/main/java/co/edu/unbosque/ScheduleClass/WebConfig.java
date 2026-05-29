// Autor: Paula Guerrero
// Fecha: 25/05/26
// Descripción: Clase de configuración para habilitar CORS en la aplicación ScheduleClass.
//              Permite que el frontend (React en http://localhost:3000) se comunique con el backend
//              sin restricciones de origen, habilitando métodos y cabeceras necesarias.

package co.edu.unbosque.ScheduleClass;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:3000")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*");
            }
        };
    }
}
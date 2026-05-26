package co.edu.unbosque.ScheduleClass.controller;

import co.edu.unbosque.ScheduleClass.model.Usuario;
import co.edu.unbosque.ScheduleClass.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Registro: siempre crea usuarios con rol USER
    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody Usuario usuario) {
        usuario.setRole("USER");
        usuarioRepository.save(usuario);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Usuario registrado correctamente");
        return ResponseEntity.ok(response);
    }

    // Login: valida credenciales y devuelve rol
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Usuario usuario) {
        Optional<Usuario> user = usuarioRepository.findByUsername(usuario.getUsername());
        Map<String, String> response = new HashMap<>();

        // Primero: verificar si el usuario existe
        if (user.isEmpty()) {
            response.put("error", "Usuario no existe");
            return ResponseEntity.status(404).body(response);
        }

        // Segundo: verificar contraseña
        if (!user.get().getPassword().equals(usuario.getPassword())) {
            response.put("error", "Contraseña incorrecta");
            return ResponseEntity.status(401).body(response);
        }

        // Si todo está bien: devolver datos
        response.put("role", user.get().getRole());
        response.put("username", user.get().getUsername());
        return ResponseEntity.ok(response);
    }

    // Cambiar contraseña usando username
    @PostMapping("/reset")
    public ResponseEntity<Map<String, String>> resetPassword(@RequestBody Usuario usuario) {
        Map<String, String> response = new HashMap<>();

        Optional<Usuario> user = usuarioRepository.findByUsername(usuario.getUsername());

        // Verificar si el usuario existe
        if (user.isEmpty()) {
            response.put("error", "Usuario no existe");
            return ResponseEntity.status(404).body(response);
        }

        // Actualizar contraseña
        Usuario existingUser = user.get();
        existingUser.setPassword(usuario.getPassword());
        usuarioRepository.save(existingUser);

        response.put("message", "Contraseña actualizada correctamente");
        return ResponseEntity.ok(response);
    }
}
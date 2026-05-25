package co.edu.unbosque.ScheduleClass.controller;

import co.edu.unbosque.ScheduleClass.model.Usuario;
import co.edu.unbosque.ScheduleClass.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
    public String register(@RequestBody Usuario usuario) {
        usuario.setRole("USER"); // seguridad: siempre USER
        usuarioRepository.save(usuario);
        return "Usuario registrado correctamente";
    }

    // Login: valida credenciales y devuelve rol
    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Usuario usuario) {
        Optional<Usuario> user = usuarioRepository.findByUsername(usuario.getUsername());
        Map<String, String> response = new HashMap<>();
        if (user.isPresent() && user.get().getPassword().equals(usuario.getPassword())) {
            response.put("role", user.get().getRole());
            response.put("username", user.get().getUsername());
            return response;
        }
        response.put("error", "Credenciales inválidas");
        return response;
    }
}

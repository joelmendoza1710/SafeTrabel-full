package com.safetrabel.safetrabel_api.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.safetrabel.safetrabel_api.model.dto.UserDTO;
import com.safetrabel.safetrabel_api.payload.AuthResponse;
import com.safetrabel.safetrabel_api.payload.LoginRequest;
import com.safetrabel.safetrabel_api.payload.RegisterAdminRequest;
import com.safetrabel.safetrabel_api.payload.RegisterRequest;
import com.safetrabel.safetrabel_api.service.AuthService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins={"http://localhost:4200"})
public class AuthController {
    @Autowired
     private  AuthService authService;


     // Listar todos los usuarios
    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsuarios() {
        List<UserDTO> usuarios = authService.getAllUsuarios();
        return ResponseEntity.ok(usuarios);
    }

    // Obtener un usuario por ID
    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUsuarioById(@PathVariable Long id) {
        Optional<UserDTO> usuario = authService.getUsuarioById(id);
        return usuario.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Crear un nuevo usuario
    @PostMapping
    public ResponseEntity<UserDTO> createUsuario(@RequestBody UserDTO UserDTO) {
        UserDTO newUsuario = authService.createUsuario(UserDTO);
        return ResponseEntity.ok(newUsuario);
    }

    // Editar un usuario existente
    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> updateUsuario(@PathVariable Long id, @RequestBody UserDTO UserDTO) {
        try {
            UserDTO updatedUsuario = authService.updateUsuario(id, UserDTO);
            return ResponseEntity.ok(updatedUsuario);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Eliminar un usuario por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUsuario(@PathVariable Long id) {
        try {
            authService.deleteUsuario(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }


    @PostMapping(value = "login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request)
    {
        return ResponseEntity.ok(authService.login(request));
    }

       @PostMapping(value = "register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request)
    {
        return ResponseEntity.ok(authService.register(request));
    }
    @PostMapping(value = "registeradmin")
    public ResponseEntity<AuthResponse> registerAdmin(@RequestBody RegisterAdminRequest request)
    {
        return ResponseEntity.ok(authService.registerAdmin(request));
    }


}

package com.safetrabel.safetrabel_api.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.safetrabel.safetrabel_api.Jwt.JwtService;
import com.safetrabel.safetrabel_api.mapper.UserMapper;
import com.safetrabel.safetrabel_api.model.dao.UsuarioDao;
import com.safetrabel.safetrabel_api.model.dto.UserDTO;
import com.safetrabel.safetrabel_api.model.entity.User.Role;
import com.safetrabel.safetrabel_api.model.entity.User.User;
import com.safetrabel.safetrabel_api.payload.AuthResponse;
import com.safetrabel.safetrabel_api.payload.LoginRequest;
import com.safetrabel.safetrabel_api.payload.RegisterAdminRequest;
import com.safetrabel.safetrabel_api.payload.RegisterRequest;

@Service
public class AuthService {
    @Autowired
    private UsuarioDao usuarioDao;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserMapper userMapper;





     // Listar todos los usuarios
    public List<UserDTO> getAllUsuarios() {
        return usuarioDao.findAll().stream()
                .map(userMapper::toUserDTO)
                .collect(Collectors.toList());
    }

    // Obtener un usuario por ID
    public Optional<UserDTO> getUsuarioById(Long id) {
        return usuarioDao.findById(id)
                .map(userMapper::toUserDTO);
    }

    // Crear un nuevo usuario
    public UserDTO createUsuario(UserDTO usuarioDTO) {
        User usuario = userMapper.toUser(usuarioDTO);
        User savedUsuario = usuarioDao.save(usuario);
        return userMapper.toUserDTO(savedUsuario);
    }

    // Editar un usuario existente
    public UserDTO updateUsuario(Long id, UserDTO usuarioDTO) {
        User existingUsuario = usuarioDao.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + id));

        existingUsuario.setName(usuarioDTO.getName());
        existingUsuario.setUsername(usuarioDTO.getUsername());
        // Actualiza otros campos según sea necesario

        User updatedUsuario = usuarioDao.save(existingUsuario);
        return userMapper.toUserDTO(updatedUsuario);
    }

    // Eliminar un usuario por ID
    public void deleteUsuario(Long id) {
        User usuario = usuarioDao.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + id));
        usuarioDao.delete(usuario);
    }

    

     

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        User user = usuarioDao.findByUsername(request.getUsername()).orElseThrow();
        String token = jwtService.getToken((UserDetails) user);

        // Convertir User a UserDTO
        UserDTO userDTO = UserMapper.INSTANCE.toUserDTO(user);

        return AuthResponse.builder()
                .result(userDTO)
                .token(token)
                .build();
    }

    public AuthResponse register(RegisterRequest request) {
        User user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .name(request.getName())
                .role(Role.USER)
                .build();

        usuarioDao.save(user);

        // Convertir User a UserDTO
        UserDTO userDTO = UserMapper.INSTANCE.toUserDTO(user);

        return AuthResponse.builder()
                .result(userDTO)
                .token(jwtService.getToken(user))
                .build();
    }

    public AuthResponse registerAdmin(RegisterAdminRequest request) {
        User user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .name(request.getName())
                .role(request.getRole())
                .build();

        usuarioDao.save(user);

        // Convertir User a UserDTO
        UserDTO userDTO = UserMapper.INSTANCE.toUserDTO(user);

        return AuthResponse.builder()
                .result(userDTO)
                .token(jwtService.getToken(user))
                .build();
    }
}

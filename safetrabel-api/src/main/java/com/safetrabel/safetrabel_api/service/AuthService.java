package com.safetrabel.safetrabel_api.service;

import java.util.List;

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
import com.safetrabel.safetrabel_api.model.entity.locations;
import com.safetrabel.safetrabel_api.model.entity.User.Role;
import com.safetrabel.safetrabel_api.model.entity.User.User;
import com.safetrabel.safetrabel_api.payload.AuthResponse;
import com.safetrabel.safetrabel_api.payload.LoginRequest;
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

       public List<User> getAllLocations() {
        return usuarioDao.findAll();
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
}

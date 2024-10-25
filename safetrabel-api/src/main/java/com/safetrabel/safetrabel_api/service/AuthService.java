package com.safetrabel.safetrabel_api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.safetrabel.safetrabel_api.Jwt.JwtService;
import com.safetrabel.safetrabel_api.model.dao.UsuarioDao;
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

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        UserDetails user=usuarioDao.findByUsername(request.getUsername()).orElseThrow();
        User users=usuarioDao.findByUsername(request.getUsername()).orElseThrow();
        String token=jwtService.getToken(user);
        return AuthResponse.builder()
            .result(users)
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

        return AuthResponse.builder()
                 .result(user)
                .token(jwtService.getToken(user))
                .build();

    }

}

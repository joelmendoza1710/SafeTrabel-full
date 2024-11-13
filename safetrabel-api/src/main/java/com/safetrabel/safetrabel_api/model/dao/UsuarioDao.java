package com.safetrabel.safetrabel_api.model.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.safetrabel.safetrabel_api.model.entity.User.User;


public interface UsuarioDao extends JpaRepository<User,Integer> {
    Optional<User> findByUsername(String username); 
   
   
    Optional<User> findById(Long userId); 


}

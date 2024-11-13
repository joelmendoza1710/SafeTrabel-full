package com.safetrabel.safetrabel_api.model.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.safetrabel.safetrabel_api.model.entity.photos;

public interface PhotosDao extends JpaRepository<photos, Long> {
        Optional<photos> findByUserId(Integer username);

        // Método para obtener todas las fotos de un usuario
        List<photos> findByUserId(Long userId);

         // Método para obtener todas las fotos de una ubicación
    List<photos> findByLocationId(Long locationId);

   



}

package com.safetrabel.safetrabel_api.model.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.safetrabel.safetrabel_api.model.entity.reviews;

public interface ReviewDao extends JpaRepository<reviews, Long> {
    Optional<reviews> findByUserId(Integer idusuario);

    List<reviews> findAllByOrderByCreatedAtDesc();

    // Método para filtrar reseñas por userId
    List<reviews> findByUserIdOrderByCreatedAtDesc(Long userId);

    // Método para filtrar reseñas por locationId
    List<reviews> findByLocationIdOrderByCreatedAtDesc(Long locationId);

}

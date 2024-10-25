package com.safetrabel.safetrabel_api.model.dao;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

import com.safetrabel.safetrabel_api.model.entity.photos;

public interface PhotosDao extends JpaRepository<photos,Long>{
        Optional<photos> findByUserId(Integer username); 



}

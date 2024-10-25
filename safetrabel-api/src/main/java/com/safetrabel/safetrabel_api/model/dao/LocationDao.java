package com.safetrabel.safetrabel_api.model.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.safetrabel.safetrabel_api.model.entity.locations;

public interface LocationDao extends JpaRepository<locations,Long>{

}

package com.safetrabel.safetrabel_api.model.entity;


import java.time.ZonedDateTime;

import org.springframework.beans.factory.parsing.Location;

import com.safetrabel.safetrabel_api.model.entity.User.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "reviews")
public class reviews {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Autogeneración de ID
    private Long id;

    // Relación Many-to-One con la entidad 'User'
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)  // Foreign key y restricción de no nulo
    private User user;

    // Relación Many-to-One con la entidad 'Location'
    @ManyToOne
    @JoinColumn(name = "location_id", nullable = false)  // Foreign key y restricción de no nulo
    private locations location;

    @Column(nullable = false)  // rating es obligatorio
    private int rating;

    private String comment;

    @Column(name = "created_at", columnDefinition = "TIMESTAMP WITH TIME ZONE")
    private ZonedDateTime createdAt = ZonedDateTime.now();  // Valor por defecto

}

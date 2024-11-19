package com.safetrabel.safetrabel_api.model.entity;


import java.time.ZonedDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
@Table(name = "locations")
public class locations {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    String name;
    @Column(nullable = false)

    String city;
    @Column(nullable = false)

    String country;
    @Column(nullable = false)

    String description;
    @Column(nullable = false)

    String address;

    @Column(name = "created_at", columnDefinition = "TIMESTAMP WITH TIME ZONE")
    @Builder.Default 
    private ZonedDateTime createdAt = ZonedDateTime.now();  // Definir valor por defecto
    



}

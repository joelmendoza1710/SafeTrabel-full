package com.safetrabel.safetrabel_api.model.entity;

import com.safetrabel.safetrabel_api.model.entity.User.User;

import java.time.ZonedDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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
@Table(name = "photos")
public class photos {


     @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Autogeneración de ID
    private Long id;

    // Relación Many-to-One con la entidad 'Location'
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "location_id", nullable = false)  // Foreign key y restricción de no nulo
    private locations location;

    // Relación Many-to-One con la entidad 'User'
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)  // Foreign key y restricción de no nulo
    private User user;

    @Column(name = "photo_url", nullable = false)  // URL de la foto obligatoria
    private String photoUrl;

    @Column(name = "uploaded_at", columnDefinition = "TIMESTAMP WITH TIME ZONE")
    @Builder.Default 
    private ZonedDateTime uploadedAt = ZonedDateTime.now();  // Valor por defecto

    

}

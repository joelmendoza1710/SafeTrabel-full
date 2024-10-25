package com.safetrabel.safetrabel_api.controller;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.safetrabel.safetrabel_api.model.entity.locations;
import com.safetrabel.safetrabel_api.service.LocationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/location")
@RequiredArgsConstructor
@CrossOrigin(origins={"http://localhost:4200"})
public class LocationController {


    @Autowired
    private LocationService locationService;

    // Método para insertar una nueva ubicación
    @PostMapping
    public ResponseEntity<locations> createLocation(@RequestBody locations location) {
        locations savedLocation = locationService.saveLocation(location);
        return ResponseEntity.ok(savedLocation);
    }

    // Método para obtener todas las ubicaciones
    @GetMapping
    public List<locations> getAllLocations() {
        return locationService.getAllLocations();
    }

    // Método para obtener una ubicación por ID
    @GetMapping("/{id}")
    public ResponseEntity<locations> getLocationById(@PathVariable Long id) {
        Optional<locations> location = locationService.getLocationById(id);
        if (location.isPresent()) {
            return ResponseEntity.ok(location.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Método para actualizar una ubicación existente
    @PutMapping("/{id}")
    public ResponseEntity<locations> updateLocation(@PathVariable Long id, @RequestBody locations locationDetails) {
        try {
            locations updatedLocation = locationService.updateLocation(id, locationDetails);
            return ResponseEntity.ok(updatedLocation);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Método para eliminar una ubicación por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLocation(@PathVariable Long id) {
        locationService.deleteLocation(id);
        return ResponseEntity.noContent().build();
    }

}

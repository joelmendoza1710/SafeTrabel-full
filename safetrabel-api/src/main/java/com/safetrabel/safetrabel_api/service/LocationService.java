package com.safetrabel.safetrabel_api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import com.safetrabel.safetrabel_api.model.dao.LocationDao;
import com.safetrabel.safetrabel_api.model.entity.locations;

@Service
public class LocationService {
     @Autowired
    private LocationDao locationRepository;

    // Método para insertar o actualizar una ubicación
    public locations saveLocation(locations location) {
        return locationRepository.save(location);
    }

    // Método para obtener todas las ubicaciones
    public List<locations> getAllLocations() {
        return locationRepository.findAll();
    }

    // Método para obtener una ubicación por ID
    public Optional<locations> getLocationById(Long id) {
        return locationRepository.findById(id);
    }

    // Método para eliminar una ubicación por ID
    public void deleteLocation(Long id) {
        locationRepository.deleteById(id);
    }

    // Método para actualizar una ubicación existente
    public locations updateLocation(Long id, locations locationDetails) {
        Optional<locations> optionalLocation = locationRepository.findById(id);
        if (optionalLocation.isPresent()) {
            locations location = optionalLocation.get();
            location.setName(locationDetails.getName());
            location.setAddress(locationDetails.getAddress());
            location.setCity(locationDetails.getCity());
            location.setCountry(locationDetails.getCountry());
            location.setDescription(locationDetails.getDescription());
            location.setCreatedAt(locationDetails.getCreatedAt());
            return locationRepository.save(location);
        } else {
            throw new RuntimeException("Location not found with id " + id);
        }
    }





}

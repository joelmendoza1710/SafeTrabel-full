package com.safetrabel.safetrabel_api.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.safetrabel.safetrabel_api.model.dao.PhotosDao;
import com.safetrabel.safetrabel_api.model.entity.photos;

@Service
public class PhotosService {
     @Autowired
    private PhotosDao photoRepository;

    // Método para insertar o actualizar una foto
    public photos savePhoto(photos photo) {
        return photoRepository.save(photo);
    }

    // Método para obtener todas las fotos
    public List<photos> getAllPhotos() {
        return photoRepository.findAll();
    }

    // Método para obtener una foto por ID
    public Optional<photos> getPhotoById(Long id) {
        return photoRepository.findById(id);
    }

    // Método para eliminar una foto por ID
    public void deletePhoto(Long id) {
        photoRepository.deleteById(id);
    }

    // Método para actualizar una foto existente
    public photos updatePhoto(Long id, photos photoDetails) {
        Optional<photos> optionalPhoto = photoRepository.findById(id);
        if (optionalPhoto.isPresent()) {
            photos photo = optionalPhoto.get();
            photo.setLocation(photoDetails.getLocation());
            photo.setUser(photoDetails.getUser());
            photo.setPhotoUrl(photoDetails.getPhotoUrl());
            photo.setUploadedAt(photoDetails.getUploadedAt());
            return photoRepository.save(photo);
        } else {
            throw new RuntimeException("Photo not found with id " + id);
        }
    }

    public photos savePhotourl(photos photo) {
        return photoRepository.save(photo);
    }

}

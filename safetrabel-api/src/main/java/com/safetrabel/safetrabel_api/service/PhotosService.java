package com.safetrabel.safetrabel_api.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;





import com.safetrabel.safetrabel_api.mapper.PhotosMapper;
import com.safetrabel.safetrabel_api.model.dao.PhotosDao;
import com.safetrabel.safetrabel_api.model.dto.PhotosDTO;
import com.safetrabel.safetrabel_api.model.entity.photos;


@Service
public class PhotosService  {

    @Autowired
    private PhotosDao photoRepository;
   

    @Autowired
    private PhotosMapper photosMapper; // Inyección del PhotosMapper

  


    // Método para insertar o actualizar una foto con PhotosDTO
    public PhotosDTO savePhoto(PhotosDTO photoDTO) {
        photos photoEntity = photosMapper.toPhotosEntity(photoDTO); // Convertir DTO a entidad
        photos savedPhoto = photoRepository.save(photoEntity);
        return photosMapper.toPhotosDTO(savedPhoto); // Convertir entidad a DTO
    }

    // Método para obtener todas las fotos con PhotosDTO
    public List<PhotosDTO> getAllPhotos() {
        List<photos> photosList = photoRepository.findAll();
        return photosList.stream()
                .map(photosMapper::toPhotosDTO) // Convertir de entidad a DTO
                .collect(Collectors.toList());
    }

    // Método para obtener una foto por ID con PhotosDTO
    public Optional<PhotosDTO> getPhotoById(Long id) {
        Optional<photos> photo = photoRepository.findById(id);
        return photo.map(photosMapper::toPhotosDTO); // Convertir de entidad a DTO
    }

    // Método para eliminar una foto por ID
    public void deletePhoto(Long id) {
        photoRepository.deleteById(id);
    }

    // Método para actualizar una foto existente con PhotosDTO
    public PhotosDTO updatePhoto(Long id, PhotosDTO photoDetailsDTO) {
        Optional<photos> optionalPhoto = photoRepository.findById(id);
        if (optionalPhoto.isPresent()) {
            photos photo = optionalPhoto.get();
            photos updatedPhoto = photosMapper.toPhotosEntity(photoDetailsDTO); // Convertir DTO a entidad
            updatedPhoto.setId(photo.getId()); // Aseguramos que el ID existente se mantenga
            photos savedUpdatedPhoto = photoRepository.save(updatedPhoto);
            return photosMapper.toPhotosDTO(savedUpdatedPhoto); // Convertir entidad a DTO
        } else {
            throw new RuntimeException("Photo not found with id " + id);
        }
    }

    // Metodo para guardar foto en carpeta local
    public photos savePhotourl(photos photo) {
        return photoRepository.save(photo);
    }

    // Método para obtener fotos por userId con PhotosDTO
    public List<PhotosDTO> getPhotosByUserId(Long userId) {
        List<photos> photosList = photoRepository.findByUserId(userId);
        return photosList.stream()
                .map(photosMapper::toPhotosDTO) // Convertir de entidad a DTO
                .collect(Collectors.toList());
    }

    // Método para obtener fotos por locationId con PhotosDTO
    public List<PhotosDTO> getPhotosByLocationId(Long locationId) {
        List<photos> photosList = photoRepository.findByLocationId(locationId);
        return photosList.stream()
                .map(photosMapper::toPhotosDTO) // Convertir de entidad a DTO
                .collect(Collectors.toList());
    }




}

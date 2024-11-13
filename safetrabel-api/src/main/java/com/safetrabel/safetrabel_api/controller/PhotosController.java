package com.safetrabel.safetrabel_api.controller;


import java.io.IOException;
import java.nio.file.Files;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.safetrabel.safetrabel_api.model.dao.StorageService;
import com.safetrabel.safetrabel_api.model.dto.PhotosDTO;

import com.safetrabel.safetrabel_api.service.PhotosService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;


@RestController
@RequestMapping("/api/v1/photo")
@RequiredArgsConstructor
@AllArgsConstructor
@CrossOrigin(origins={"http://localhost:4200"})
public class PhotosController {

   // private final String uploadDir = "C:/Users/A01TIJMA.AMERICASHG/Documents/joel/SafeTrabel-full/safetrabel-api/src/main/java/com/safetrabel/safetrabel_api/fotos";
    @Autowired
    private PhotosService photoService;

    @Autowired
    private HttpServletRequest request;

    @Autowired
    private StorageService storageService;
  

   
    // Método para obtener todas las fotos
    @Operation(summary = "trae todas las fotos", description = "lista todas las fotos de la base de datos.")
    @GetMapping
    public List<PhotosDTO> getAllPhotos() {
        return photoService.getAllPhotos();
    }

    // Método para obtener una foto por ID
    @Operation(summary = "obtiene una  foto por id", description = "obtiene una foto por id.")
    @GetMapping("/{id}")
    public ResponseEntity<PhotosDTO> getPhotoById(@PathVariable Long id) {
        Optional<PhotosDTO> photo = photoService.getPhotoById(id);
        if (photo.isPresent()) {
            return ResponseEntity.ok(photo.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Método para actualizar una foto existente
    @Operation(summary = "actualiza una foto", description = "actualiza una foto segun su id.")

    @PutMapping("/{id}")
    public ResponseEntity<PhotosDTO> updatePhoto(@PathVariable Long id, @RequestBody PhotosDTO photoDetails) {
        try {
            PhotosDTO updatedPhoto = photoService.updatePhoto(id, photoDetails);
            return ResponseEntity.ok(updatedPhoto);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Método para eliminar una foto por ID
    @Operation(summary = "Borrar foto", description = "Borra una foto segun su id.")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePhoto(@PathVariable Long id) {
        photoService.deletePhoto(id);
        return ResponseEntity.noContent().build();
    }

   


// Metodo para tarer todas las fotos por usuario
@Operation(summary = "Obtiene todas las fotos por usuario", description = "Devuelve una lista de fotos para un usuario específico.")
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PhotosDTO>> getPhotosByUserId(@PathVariable Long userId) {
        List<PhotosDTO> photos = photoService.getPhotosByUserId(userId);
        return ResponseEntity.ok(photos);
    }


//Metodo para traer las fotos por location
@Operation(summary = "Obtiene todas las fotos por localizacion", description = "Devuelve una lista de fotos para una localizacion específico.")

    @GetMapping("/location/{locationId}")
    public ResponseEntity<List<PhotosDTO>> getPhotosByLocationId(@PathVariable Long locationId) {
        List<PhotosDTO> photos = photoService.getPhotosByLocationId(locationId);
        return ResponseEntity.ok(photos);
    }





    //prueba para subir fotos 

    @PostMapping("/upload")
    public Map<String,String>uloadfile(@RequestParam("file")MultipartFile multipartFile){
        String path = storageService.store(multipartFile);
        String host = request.getRequestURL().toString().replace(request.getRequestURI(), "");
        String url = ServletUriComponentsBuilder
        .fromHttpUrl(host)
        .path("/media/")
        .path(path)
        .toUriString();
        

        return Map.of("url",url);
        
    }

    @GetMapping("{filename:.+}")
    public ResponseEntity<Resource> getfile(@PathVariable String filename) throws IOException {

        Resource file = storageService.loadAsResource(filename);
        String contenType= Files.probeContentType(file.getFile().toPath());
        return ResponseEntity
        .ok()
        .header(HttpHeaders.CONTENT_TYPE, contenType)
        .body(file);
    }
    


}

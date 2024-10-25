package com.safetrabel.safetrabel_api.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.safetrabel.safetrabel_api.model.dao.LocationDao;
import com.safetrabel.safetrabel_api.model.dao.UsuarioDao;
import com.safetrabel.safetrabel_api.model.entity.locations;
import com.safetrabel.safetrabel_api.model.entity.photos;
import com.safetrabel.safetrabel_api.model.entity.User.User;
import com.safetrabel.safetrabel_api.service.PhotosService;


import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/photo")
@RequiredArgsConstructor
@CrossOrigin(origins={"http://localhost:4200"})
public class PhotosController {

    private final String uploadDir = "C:/Users/A01TIJMA.AMERICASHG/Documents/joel/SafeTrabel-full/safetrabel-api/src/main/java/com/safetrabel/safetrabel_api/fotos";
    @Autowired
    private PhotosService photoService;
    @Autowired
    private UsuarioDao userRepository;

    @Autowired
    private LocationDao locationRepository;

    // Método para insertar una nueva foto
    @PostMapping
    public ResponseEntity<photos> createPhoto(@RequestBody photos photo) {
        photos savedPhoto = photoService.savePhoto(photo);
        return ResponseEntity.ok(savedPhoto);
    }

    // Método para obtener todas las fotos
    @GetMapping
    public List<photos> getAllPhotos() {
        return photoService.getAllPhotos();
    }

    // Método para obtener una foto por ID
    @GetMapping("/{id}")
    public ResponseEntity<photos> getPhotoById(@PathVariable Long id) {
        Optional<photos> photo = photoService.getPhotoById(id);
        if (photo.isPresent()) {
            return ResponseEntity.ok(photo.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Método para actualizar una foto existente
    @PutMapping("/{id}")
    public ResponseEntity<photos> updatePhoto(@PathVariable Long id, @RequestBody photos photoDetails) {
        try {
            photos updatedPhoto = photoService.updatePhoto(id, photoDetails);
            return ResponseEntity.ok(updatedPhoto);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Método para eliminar una foto por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePhoto(@PathVariable Long id) {
        photoService.deletePhoto(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadPhoto(@RequestParam("locationId") Long locationId,
                                              @RequestParam("userId") Integer userId,
                                              @RequestParam("file") MultipartFile file) {
        // Crear el directorio si no existe
        File directory = new File(uploadDir);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        // Generar un nombre único para la imagen
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path filePath = (Path) Paths.get(uploadDir + fileName);

        try {
            // Guardar el archivo en la carpeta `fotos`
            Files.write(filePath, file.getBytes());

            // Buscar el usuario y la ubicación
            Optional<User> user = userRepository.findById(userId);
            Optional<locations> location = locationRepository.findById(locationId);

            if (user.isEmpty() || location.isEmpty()) {
                return ResponseEntity.badRequest().body("Usuario o ubicación no encontrados");
            }

            // Guardar la URL de la foto en la base de datos
            String photoUrl = "/fotos/" + fileName;
            photos photo = new photos();
            photo.setUser(user.get());
            photo.setLocation(location.get());
            photo.setPhotoUrl(photoUrl);
            photoService.savePhotourl(photo);

            return ResponseEntity.ok("Foto subida exitosamente: " + photoUrl);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error al subir la foto: " + e.getMessage());
        }
    }

}

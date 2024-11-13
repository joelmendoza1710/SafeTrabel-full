package com.safetrabel.safetrabel_api.service;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.web.multipart.MultipartFile;

import com.safetrabel.safetrabel_api.model.dao.StorageService;

import jakarta.annotation.PostConstruct;

public class FileSystemStorageService implements StorageService {

    private Path rootLcation;

      @Value("${media.location}")
    private String mediaLocation;


    @Override
  @PostConstruct
public void init() throws IOException{
    rootLcation= Paths.get(mediaLocation);
    Files.createDirectories(rootLcation);

}



    // prueba de subir foto
    @Override
    public String store(MultipartFile file) {
        try {

            if (file.isEmpty()) {
                throw new RuntimeException("failed to store empy file");

            }
            String filename= file.getOriginalFilename();
            Path destinationFile = rootLcation.resolve(Paths.get(filename))
                .normalize().toAbsolutePath();

                try(InputStream inputStream= file.getInputStream()){
                    Files.copy(inputStream,destinationFile,StandardCopyOption.REPLACE_EXISTING);
                }
                return filename;

        } catch (IOException e) {
            throw new RuntimeException("filed to store file", e);

        }
    }

    @Override
    public Resource loadAsResource(String filename){
        try{
            Path file =rootLcation.resolve(filename);
            Resource resource = new UrlResource((file.toUri()));
            if (resource.exists()   || resource.isReadable()) {
                return resource;
                
            }else{
                throw new RuntimeException("could not read file"+filename);
            }

        }catch(MalformedURLException e){
            throw new RuntimeException("could not read file"+filename);
        }
    }

}

package com.safetrabel.safetrabel_api.mapper;


import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.safetrabel.safetrabel_api.model.dto.PhotosDTO;
import com.safetrabel.safetrabel_api.model.entity.photos;



@Mapper(componentModel = "spring")
public interface PhotosMapper {
    
    PhotosMapper INSTANCE = Mappers.getMapper(PhotosMapper.class);

    // Método para convertir de entidad a DTO
    PhotosDTO toPhotosDTO(photos photo);

    // Método para convertir de DTO a entidad
    photos toPhotosEntity(PhotosDTO photoDTO);
    

}

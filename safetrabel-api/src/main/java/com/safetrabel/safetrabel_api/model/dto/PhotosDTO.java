package com.safetrabel.safetrabel_api.model.dto;

import java.time.ZonedDateTime;
import com.safetrabel.safetrabel_api.model.entity.locations;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PhotosDTO {

    private Long id;
    private String photoUrl;
    private locations location;
    private ZonedDateTime uploadedAt;
    private UserDTO user;

}

package com.safetrabel.safetrabel_api.model.dto;

import java.time.ZonedDateTime;

import com.safetrabel.safetrabel_api.model.entity.locations;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReviewDTO {
     private Long id;
    private UserDTO user;
    private locations location;
    private int rating;
    private String comment;
    private ZonedDateTime createdAt;

}

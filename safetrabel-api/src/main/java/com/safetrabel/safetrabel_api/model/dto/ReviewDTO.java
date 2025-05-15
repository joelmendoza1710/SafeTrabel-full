package com.safetrabel.safetrabel_api.model.dto;

import java.time.ZonedDateTime;

import com.safetrabel.safetrabel_api.model.entity.locations;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDTO {
     private Long id;
    private UserDTO user;
    private locations location;
    private int rating;
    private String comment;
    private ZonedDateTime createdAt;

}

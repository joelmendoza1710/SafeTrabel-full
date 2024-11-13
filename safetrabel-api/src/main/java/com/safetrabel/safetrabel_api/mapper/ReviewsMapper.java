package com.safetrabel.safetrabel_api.mapper;

import com.safetrabel.safetrabel_api.model.dto.ReviewDTO;
import com.safetrabel.safetrabel_api.model.entity.reviews;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface ReviewsMapper {

    ReviewsMapper INSTANCE = Mappers.getMapper(ReviewsMapper.class);

    ReviewDTO toReviewsDTO(reviews review);

    reviews toReviews(ReviewDTO reviewDTO);

    ReviewDTO toReviewDTO(reviews review); 

}

package com.safetrabel.safetrabel_api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.safetrabel.safetrabel_api.mapper.ReviewsMapper;
import com.safetrabel.safetrabel_api.model.dao.ReviewDao;
import com.safetrabel.safetrabel_api.model.dto.ReviewDTO;
import com.safetrabel.safetrabel_api.model.entity.reviews;

@Service
public class ReviewService {
    @Autowired
    private ReviewDao reviewRepository;
    @Autowired
    private ReviewsMapper reviewsMapper;

    // Método para insertar o actualizar una reseña
    public ReviewDTO saveReview(reviews review) {
        reviews savedReview = reviewRepository.save(review);
        return reviewsMapper.toReviewDTO(savedReview);
    }

    // Método para obtener todas las reseñas con ReviewDTO
    public List<ReviewDTO> getAllReviews() {
        List<reviews> reviewsList = reviewRepository.findAll();
        return reviewsList.stream()
                .map(reviewsMapper::toReviewDTO)
                .collect(Collectors.toList());
    }

    // Método para obtener una reseña por ID con ReviewDTO
    public Optional<ReviewDTO> getReviewById(Long id) {
        Optional<reviews> review = reviewRepository.findById(id);
        return review.map(reviewsMapper::toReviewDTO);
    }

    // Método para actualizar una reseña existente con ReviewDTO
    public ReviewDTO updateReview(Long id, reviews reviewDetails) {
        Optional<reviews> optionalReview = reviewRepository.findById(id);
        if (optionalReview.isPresent()) {
            reviews review = optionalReview.get();
            review.setUser(reviewDetails.getUser());
            review.setLocation(reviewDetails.getLocation());
            review.setRating(reviewDetails.getRating());
            review.setComment(reviewDetails.getComment());
            review.setCreatedAt(reviewDetails.getCreatedAt());
            reviews updatedReview = reviewRepository.save(review);
            return reviewsMapper.toReviewDTO(updatedReview);
        } else {
            throw new RuntimeException("Review not found with id " + id);
        }
    }

    // Métodos para obtener reseñas filtradas y ordenadas con ReviewDTO
    public List<ReviewDTO> getReviewsOrderedByDate() {
        List<reviews> reviewsList = reviewRepository.findAllByOrderByCreatedAtDesc();
        return reviewsList.stream()
                .map(reviewsMapper::toReviewDTO)
                .collect(Collectors.toList());
    }

    public List<ReviewDTO> getReviewsByUserId(Long userId) {
        List<reviews> reviewsList = reviewRepository.findByUserIdOrderByCreatedAtDesc(userId);
        return reviewsList.stream()
                .map(reviewsMapper::toReviewDTO)
                .collect(Collectors.toList());
    }

    public List<ReviewDTO> getReviewsByLocationId(Long locationId) {
        List<reviews> reviewsList = reviewRepository.findByLocationIdOrderByCreatedAtDesc(locationId);
        return reviewsList.stream()
                .map(reviewsMapper::toReviewDTO)
                .collect(Collectors.toList());
    }

    public void deleteReview(Long id) {
        if (reviewRepository.existsById(id)) {
            reviewRepository.deleteById(id);
        } else {
            throw new RuntimeException("Review not found with id " + id);
        }
    }
}

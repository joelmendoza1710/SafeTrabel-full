package com.safetrabel.safetrabel_api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;


import com.safetrabel.safetrabel_api.model.dao.ReviewDao;
import com.safetrabel.safetrabel_api.model.entity.reviews;

@Service
public class ReviewService {
     @Autowired
    private ReviewDao reviewRepository;

    // Método para insertar o actualizar una reseña
    public reviews saveReview(reviews review) {
        return reviewRepository.save(review);
    }

    // Método para obtener todas las reseñas
    public List<reviews> getAllReviews() {
        return reviewRepository.findAll();
    }

    // Método para obtener una reseña por ID
    public Optional<reviews> getReviewById(Long id) {
        return reviewRepository.findById(id);
    }

    // Método para eliminar una reseña por ID
    public void deleteReview(Long id) {
        reviewRepository.deleteById(id);
    }

    // Método para actualizar una reseña existente
    public reviews updateReview(Long id, reviews reviewDetails) {
        Optional<reviews> optionalReview = reviewRepository.findById(id);
        if (optionalReview.isPresent()) {
            reviews review = optionalReview.get();
            review.setUser(reviewDetails.getUser());
            review.setLocation(reviewDetails.getLocation());
            review.setRating(reviewDetails.getRating());
            review.setComment(reviewDetails.getComment());
            review.setCreatedAt(reviewDetails.getCreatedAt());
            return reviewRepository.save(review);
        } else {
            throw new RuntimeException("Review not found with id " + id);
        }
    }


    // Metodo para Mostrar los registros nuevos primero
    public List<reviews> getReviewsOrderedByDate() {
        return reviewRepository.findAllByOrderByCreatedAtDesc();
    }

}

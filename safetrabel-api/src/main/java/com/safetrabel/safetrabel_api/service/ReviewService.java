package com.safetrabel.safetrabel_api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.safetrabel.safetrabel_api.mapper.ReviewsMapper;
import com.safetrabel.safetrabel_api.model.dao.LocationDao;
import com.safetrabel.safetrabel_api.model.dao.ReviewDao;
import com.safetrabel.safetrabel_api.model.dao.UsuarioDao;
import com.safetrabel.safetrabel_api.model.dto.ReviewDTO;
import com.safetrabel.safetrabel_api.model.entity.locations;
import com.safetrabel.safetrabel_api.model.entity.reviews;
import com.safetrabel.safetrabel_api.model.entity.User.User;

@Service
public class ReviewService {
    @Autowired
    private ReviewDao reviewRepository;
    @Autowired
    private ReviewsMapper reviewsMapper;
    @Autowired
    private UsuarioDao userRepository;
    @Autowired 
    private LocationDao locationsRepository; 

    // Método para insertar o actualizar una reseña
   public reviews createReview(Long userId, Long locationId, int rating, String comment) {
        // Buscar el usuario y la ubicación en la base de datos
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        locations location = locationsRepository.findById(locationId)
                .orElseThrow(() -> new RuntimeException("Location not found"));

        // Crear una nueva entidad reviews
        reviews review = reviews.builder()
                .user(user)
                .location(location)
                .rating(rating)
                .comment(comment)
                .createdAt(ZonedDateTime.now()) // Se asigna la fecha y hora actuales
                .build();

        // Guardar la nueva reseña en la base de datos
        return reviewRepository.save(review);
    }
    // Método para obtener todas las reseñas
    public List<ReviewDTO> getAllReviews() {
        List<reviews> reviewsList = reviewRepository.findAll();
        return reviewsList.stream()
                .map(reviewsMapper::toReviewDTO)
                .collect(Collectors.toList());
    }

    // Método para obtener una reseña por ID
    public Optional<ReviewDTO> getReviewById(Long id) {
        Optional<reviews> review = reviewRepository.findById(id);
        return review.map(reviewsMapper::toReviewDTO);
    }

    // Método para actualizar una reseña existente
    public ReviewDTO updateReview(Long id, ReviewDTO reviewDTO) {
        Optional<reviews> optionalReview = reviewRepository.findById(id);
        if (optionalReview.isPresent()) {
            reviews review = optionalReview.get();

            // Actualizamos solo los campos rating y comment
            review.setRating(reviewDTO.getRating());
            review.setComment(reviewDTO.getComment());

            // Guardamos la entidad actualizada
            reviews updatedReview = reviewRepository.save(review);
            
            // Devolvemos el DTO actualizado
            return reviewsMapper.toReviewDTO(updatedReview);
        } else {
            throw new RuntimeException("Review not found with id " + id);
        }
    }
    // Métodos para obtener reseñas filtradas y ordenadas
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

package com.safetrabel.safetrabel_api.controller;

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

import com.safetrabel.safetrabel_api.model.dto.ReviewDTO;
import com.safetrabel.safetrabel_api.model.entity.reviews;
import com.safetrabel.safetrabel_api.service.ReviewService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/review")
@RequiredArgsConstructor
@CrossOrigin(origins = { "http://localhost:4200" })
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    // Método para insertar una nueva reseña
    @PostMapping
    public ResponseEntity<reviews> createReview(@RequestParam Long userId,
                                               @RequestParam Long locationId,
                                               @RequestParam int rating,
                                               @RequestParam(required = false) String comment) {
        reviews createdReview = reviewService.createReview(userId, locationId, rating, comment);
        return ResponseEntity.ok(createdReview);
    }
    // Método para obtener todas las reseñas
    @GetMapping
    public List<ReviewDTO> getAllReviews() {
        return reviewService.getAllReviews();
    }

    // Método para obtener una reseña por ID
    @GetMapping("/{id}")
    public ResponseEntity<ReviewDTO> getReviewById(@PathVariable Long id) {
        Optional<ReviewDTO> review = reviewService.getReviewById(id);
        if (review.isPresent()) {
            return ResponseEntity.ok(review.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Método para actualizar una reseña existente
    @PutMapping("/{id}")
    public ResponseEntity<ReviewDTO> updateReview(
            @PathVariable Long id,
            @RequestBody ReviewDTO reviewDTO) {
        ReviewDTO updatedReview = reviewService.updateReview(id, reviewDTO);
        return ResponseEntity.ok(updatedReview);
    }

    // Método para eliminar una reseña por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        reviewService.deleteReview(id);
        return ResponseEntity.noContent().build();
    }

    // Metodo para Mostrar los registros nuevos primero
    @GetMapping("/recent")
    public ResponseEntity<List<ReviewDTO>> getRecentReviews() {
        List<ReviewDTO> reviews = reviewService.getReviewsOrderedByDate();
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/user/{userId}")

    // Metodo para mostrar los regsitros por usuario
    public ResponseEntity<List<ReviewDTO>> getReviewsByUserId(@PathVariable Long userId) {
        List<ReviewDTO> reviews = reviewService.getReviewsByUserId(userId);
        return ResponseEntity.ok(reviews);
    }

    // Metodo para mostrar los regsitros por localizacion

    @GetMapping("/location/{locationId}")
    public ResponseEntity<List<ReviewDTO>> getReviewsByLocationId(@PathVariable Long locationId) {
        List<ReviewDTO> reviews = reviewService.getReviewsByLocationId(locationId);
        return ResponseEntity.ok(reviews);
    }

}

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
import org.springframework.web.bind.annotation.RestController;

import com.safetrabel.safetrabel_api.model.entity.reviews;
import com.safetrabel.safetrabel_api.service.ReviewService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/review")
@RequiredArgsConstructor
@CrossOrigin(origins={"http://localhost:4200"})
public class ReviewController {
     @Autowired
    private ReviewService reviewService;

    // Método para insertar una nueva reseña
    @PostMapping
    public ResponseEntity<reviews> createReview(@RequestBody reviews review) {
        reviews savedReview = reviewService.saveReview(review);
        return ResponseEntity.ok(savedReview);
    }

    // Método para obtener todas las reseñas
    @GetMapping
    public List<reviews> getAllReviews() {
        return reviewService.getAllReviews();
    }

    // Método para obtener una reseña por ID
    @GetMapping("/{id}")
    public ResponseEntity<reviews> getReviewById(@PathVariable Long id) {
        Optional<reviews> review = reviewService.getReviewById(id);
        if (review.isPresent()) {
            return ResponseEntity.ok(review.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Método para actualizar una reseña existente
    @PutMapping("/{id}")
    public ResponseEntity<reviews> updateReview(@PathVariable Long id, @RequestBody reviews reviewDetails) {
        try {
            reviews updatedReview = reviewService.updateReview(id, reviewDetails);
            return ResponseEntity.ok(updatedReview);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Método para eliminar una reseña por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        reviewService.deleteReview(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/recent")
    public ResponseEntity<List<reviews>> getRecentReviews() {
        List<reviews> reviews = reviewService.getReviewsOrderedByDate();
        return ResponseEntity.ok(reviews);
    }
    

}

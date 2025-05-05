package com.safetrabel.safetrabel_api.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.safetrabel.safetrabel_api.model.dto.PrediccionRequest;
import com.safetrabel.safetrabel_api.model.dto.PrediccionResponse;
import com.safetrabel.safetrabel_api.service.WekaPredictionService;

@RestController
@RequestMapping("/api/prediccion")
@CrossOrigin(origins={"http://localhost:4200"})
public class PrediccionController {
    private final WekaPredictionService wekaService;

    public PrediccionController(WekaPredictionService wekaService) {
        this.wekaService = wekaService;
    }

    @PostMapping
    public ResponseEntity<PrediccionResponse> predecir(@RequestBody PrediccionRequest request) {
        try {
            PrediccionResponse respuesta = wekaService.predecir(request);
            return ResponseEntity.ok(respuesta);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

}

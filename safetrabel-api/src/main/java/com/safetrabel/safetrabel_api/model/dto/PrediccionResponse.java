package com.safetrabel.safetrabel_api.model.dto;

import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class PrediccionResponse {
    private String resultado; // "Sí" o "No"
    private boolean cumpleReglaNegocio;
    private String explicacionRegla;
    private Map<String, Double> distribucion; // Probabilidades para cada clase

}

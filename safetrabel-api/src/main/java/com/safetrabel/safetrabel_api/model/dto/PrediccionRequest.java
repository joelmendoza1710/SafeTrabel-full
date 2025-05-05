package com.safetrabel.safetrabel_api.model.dto;

import lombok.Data;

@Data
public class PrediccionRequest {
    private int edad;
    private String lugarVivienda;
    private int duracionEstadia;
    private String location;
    private int rating;
    private String sentimientoComentario;

}

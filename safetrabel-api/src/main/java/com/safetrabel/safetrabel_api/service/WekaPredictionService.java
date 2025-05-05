package com.safetrabel.safetrabel_api.service;

import java.io.InputStream;

import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;
import weka.classifiers.Classifier;
import weka.core.*;

import java.io.InputStream;
import java.util.*;

import com.safetrabel.safetrabel_api.model.dto.PrediccionRequest;
import com.safetrabel.safetrabel_api.model.dto.PrediccionResponse;

@Service
public class WekaPredictionService {
    private Classifier modelo;
    private Instances dataStructure;

    @PostConstruct
    public void init() throws Exception {
        InputStream modelStream = getClass().getResourceAsStream("/modelo_new.model");
        modelo = (Classifier) weka.core.SerializationHelper.read(modelStream);

        ArrayList<Attribute> atributos = new ArrayList<>();
        atributos.add(new Attribute("Edad"));
        atributos.add(new Attribute("Lugar_Vivienda",
                Arrays.asList("Bogota", "Medellin", "Barranquilla", "Cartagena", "Cali")));
        atributos.add(new Attribute("Duracion_Estadia"));
        atributos.add(new Attribute("Location",
                Arrays.asList("Playa_Blanca", "Ciudad_Amurallada", "Islas_del_Rosario", "San_Andres", "Guatape")));
        atributos.add(new Attribute("Rating"));
        atributos.add(new Attribute("Sentimiento_Comentario", Arrays.asList("Positivo", "Neutro", "Negativo")));
        atributos.add(new Attribute("Repeticion_Visita", Arrays.asList("Si", "No")));

        dataStructure = new Instances("Prediccion", atributos, 0);
        dataStructure.setClassIndex(dataStructure.numAttributes() - 1);
    }

    public PrediccionResponse predecir(PrediccionRequest req) throws Exception {
        DenseInstance instance = new DenseInstance(dataStructure.numAttributes());
        instance.setValue(dataStructure.attribute("Edad"), req.getEdad());
        instance.setValue(dataStructure.attribute("Lugar_Vivienda"), req.getLugarVivienda());
        instance.setValue(dataStructure.attribute("Duracion_Estadia"), req.getDuracionEstadia());
        instance.setValue(dataStructure.attribute("Location"), req.getLocation());
        instance.setValue(dataStructure.attribute("Rating"), req.getRating());
        instance.setValue(dataStructure.attribute("Sentimiento_Comentario"), req.getSentimientoComentario());
        instance.setMissing(dataStructure.classIndex());

        dataStructure.clear();
        dataStructure.add(instance);

        double pred = modelo.classifyInstance(dataStructure.firstInstance());
        String resultado = dataStructure.classAttribute().value((int) pred);

        double[] distribucion = modelo.distributionForInstance(dataStructure.firstInstance());

        Map<String, Double> distribucionMap = new LinkedHashMap<>();
        for (int i = 0; i < distribucion.length; i++) {
            String classValue = dataStructure.classAttribute().value(i);
            distribucionMap.put(classValue, distribucion[i]);
        }

        boolean cumpleRegla = cumpleCondicionesAltas(req);
        String explicacion = cumpleRegla
                ? "Cumple condiciones de alta probabilidad según lógica del negocio."
                : "No cumple con todas las condiciones clave de alta probabilidad.";

        return new PrediccionResponse(resultado, cumpleRegla, explicacion, distribucionMap);
    }

    private boolean cumpleCondicionesAltas(PrediccionRequest req) {
        return req.getRating() >= 4 &&
                "Positivo".equalsIgnoreCase(req.getSentimientoComentario()) &&
                req.getDuracionEstadia() > 5;
    }

}

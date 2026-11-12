package com.example.mvphemec.model;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class CriticidadeConverter implements AttributeConverter<Criticidade, String> {

    @Override
    public String convertToDatabaseColumn(Criticidade criticidade) {
        if (criticidade == null) {
            return null;
        }
        return switch (criticidade) {
            case ALTA -> "A";
            case MEDIA -> "B";
            case BAIXA -> "C";
        };
    }

    @Override
    public Criticidade convertToEntityAttribute(String valorBanco) {
        if (valorBanco == null) {
            return null;
        }
        return switch (valorBanco) {
            case "A" -> Criticidade.ALTA;
            case "B" -> Criticidade.MEDIA;
            case "C" -> Criticidade.BAIXA;
            default -> throw new IllegalArgumentException("Criticidade desconhecida no banco: " + valorBanco);
        };
    }
}

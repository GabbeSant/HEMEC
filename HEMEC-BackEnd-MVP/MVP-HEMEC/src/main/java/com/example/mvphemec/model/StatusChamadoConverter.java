package com.example.mvphemec.model;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class StatusChamadoConverter implements AttributeConverter<StatusChamado, String> {
    @Override public String convertToDatabaseColumn(StatusChamado value) { return value == null ? null : value.getValorBanco(); }
    @Override public StatusChamado convertToEntityAttribute(String value) { return ConversorEnumBanco.converter(value, StatusChamado.class); }
}

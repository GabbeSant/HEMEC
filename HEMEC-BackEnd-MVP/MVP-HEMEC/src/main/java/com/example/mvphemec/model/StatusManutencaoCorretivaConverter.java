package com.example.mvphemec.model;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class StatusManutencaoCorretivaConverter implements AttributeConverter<StatusManutencaoCorretiva, String> {
    @Override public String convertToDatabaseColumn(StatusManutencaoCorretiva value) { return value == null ? null : value.getValorBanco(); }
    @Override public StatusManutencaoCorretiva convertToEntityAttribute(String value) { return ConversorEnumBanco.converter(value, StatusManutencaoCorretiva.class); }
}

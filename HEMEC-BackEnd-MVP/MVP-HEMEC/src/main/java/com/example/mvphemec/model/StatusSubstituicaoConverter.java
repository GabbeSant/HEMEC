package com.example.mvphemec.model;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class StatusSubstituicaoConverter implements AttributeConverter<StatusSubstituicao, String> {
    @Override public String convertToDatabaseColumn(StatusSubstituicao value) { return value == null ? null : value.getValorBanco(); }
    @Override public StatusSubstituicao convertToEntityAttribute(String value) { return ConversorEnumBanco.converter(value, StatusSubstituicao.class); }
}

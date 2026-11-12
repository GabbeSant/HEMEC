package com.example.mvphemec.model;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class StatusChecklistConverter implements AttributeConverter<StatusChecklist, String> {
    @Override public String convertToDatabaseColumn(StatusChecklist value) { return value == null ? null : value.getValorBanco(); }
    @Override public StatusChecklist convertToEntityAttribute(String value) { return ConversorEnumBanco.converter(value, StatusChecklist.class); }
}

package com.example.mvphemec.model;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class StatusOrdemServicoConverter implements AttributeConverter<StatusOrdemServico, String> {
    @Override public String convertToDatabaseColumn(StatusOrdemServico value) { return value == null ? null : value.getValorBanco(); }
    @Override public StatusOrdemServico convertToEntityAttribute(String value) { return ConversorEnumBanco.converter(value, StatusOrdemServico.class); }
}

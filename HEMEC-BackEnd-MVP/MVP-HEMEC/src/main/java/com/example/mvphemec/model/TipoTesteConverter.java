package com.example.mvphemec.model;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class TipoTesteConverter implements AttributeConverter<TipoTeste, String> {
    @Override public String convertToDatabaseColumn(TipoTeste value) { return value == null ? null : value.getValorBanco(); }
    @Override public TipoTeste convertToEntityAttribute(String value) { return ConversorEnumBanco.converter(value, TipoTeste.class); }
}

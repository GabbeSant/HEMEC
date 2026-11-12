package com.example.mvphemec.model;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class TipoEquipamentoValorConverter implements AttributeConverter<TipoEquipamento.Valor, String> {

    @Override
    public String convertToDatabaseColumn(TipoEquipamento.Valor valor) {
        return valor == null ? null : valor.getValorBanco();
    }

    @Override
    public TipoEquipamento.Valor convertToEntityAttribute(String valorBanco) {
        if (valorBanco == null) {
            return null;
        }
        for (TipoEquipamento.Valor valor : TipoEquipamento.Valor.values()) {
            if (valor.getValorBanco().equals(valorBanco)) {
                return valor;
            }
        }
        throw new IllegalArgumentException("Tipo de equipamento desconhecido no banco: " + valorBanco);
    }
}

package com.example.mvphemec.model;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class StatusEquipamentoConverter implements AttributeConverter<StatusEquipamento, String> {

    @Override
    public String convertToDatabaseColumn(StatusEquipamento status) {
        return status == null ? null : status.getValorBanco();
    }

    @Override
    public StatusEquipamento convertToEntityAttribute(String valorBanco) {
        if (valorBanco == null) {
            return null;
        }
        for (StatusEquipamento status : StatusEquipamento.values()) {
            if (status.getValorBanco().equals(valorBanco)) {
                return status;
            }
        }
        throw new IllegalArgumentException("Status de equipamento desconhecido no banco: " + valorBanco);
    }
}

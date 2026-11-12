package com.example.mvphemec.model;

final class ConversorEnumBanco {
    private ConversorEnumBanco() {}

    static <T extends Enum<T> & EnumComValorBanco> T converter(String valorBanco, Class<T> tipo) {
        if (valorBanco == null) {
            return null;
        }
        for (T valor : tipo.getEnumConstants()) {
            if (valor.getValorBanco().equals(valorBanco)) {
                return valor;
            }
        }
        throw new IllegalArgumentException("Valor desconhecido em " + tipo.getSimpleName() + ": " + valorBanco);
    }
}

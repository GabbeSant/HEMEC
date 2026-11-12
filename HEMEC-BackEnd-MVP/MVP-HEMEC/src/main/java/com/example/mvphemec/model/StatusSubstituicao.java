package com.example.mvphemec.model;

public enum StatusSubstituicao implements EnumComValorBanco {
    REALIZADA("Realizada"),
    NAO_REALIZADA("Não Realizada"),
    PARCIAL("Parcial");

    private final String valorBanco;

    StatusSubstituicao(String valorBanco) { this.valorBanco = valorBanco; }

    public String getValorBanco() { return valorBanco; }
}

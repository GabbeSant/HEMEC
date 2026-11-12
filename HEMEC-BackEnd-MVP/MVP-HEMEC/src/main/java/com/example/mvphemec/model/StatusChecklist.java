package com.example.mvphemec.model;

public enum StatusChecklist implements EnumComValorBanco {
    APROVADO("Aprovado"),
    REPROVADO("Reprovado"),
    PENDENTE("Pendente");

    private final String valorBanco;

    StatusChecklist(String valorBanco) { this.valorBanco = valorBanco; }

    public String getValorBanco() { return valorBanco; }
}

package com.example.mvphemec.model;

public enum StatusManutencaoCorretiva implements EnumComValorBanco {
    CONCLUIDO("Concluído"),
    INCOMPLETO("Incompleto"),
    FALHA("Falha");

    private final String valorBanco;

    StatusManutencaoCorretiva(String valorBanco) { this.valorBanco = valorBanco; }

    public String getValorBanco() { return valorBanco; }
}

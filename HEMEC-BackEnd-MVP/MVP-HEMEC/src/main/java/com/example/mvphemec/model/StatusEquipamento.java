package com.example.mvphemec.model;

public enum StatusEquipamento {
    ATIVO("Ativo"),
    INATIVO("Inativo"),
    EM_MANUTENCAO("Em Manutenção"),
    DESCARTADO("Descartado");

    private final String valorBanco;

    StatusEquipamento(String valorBanco) {
        this.valorBanco = valorBanco;
    }

    public String getValorBanco() {
        return valorBanco;
    }
}

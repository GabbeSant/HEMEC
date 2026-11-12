package com.example.mvphemec.model;

public enum TipoTeste implements EnumComValorBanco {
    VISUAL("Visual"),
    FUNCIONAL("Funcional"),
    SEGURANCA("Segurança"),
    CALIBRACAO("Calibração");

    private final String valorBanco;

    TipoTeste(String valorBanco) { this.valorBanco = valorBanco; }

    public String getValorBanco() { return valorBanco; }
}

package com.example.mvphemec.model;

public enum StatusChamado implements EnumComValorBanco {
    ABERTO("Aberto"),
    EM_ATENDIMENTO("Em Atendimento"),
    AGUARDANDO_PECA("Aguardando Peça"),
    RESOLVIDO("Resolvido"),
    CANCELADO("Cancelado");

    private final String valorBanco;

    StatusChamado(String valorBanco) { this.valorBanco = valorBanco; }

    public String getValorBanco() { return valorBanco; }
}

package com.example.mvphemec.model;

public enum StatusOrdemServico implements EnumComValorBanco {
    PENDENTE("Pendente"),
    EM_EXECUCAO("Em Execução"),
    CONCLUIDA("Concluída"),
    CANCELADA("Cancelada");

    private final String valorBanco;

    StatusOrdemServico(String valorBanco) { this.valorBanco = valorBanco; }

    public String getValorBanco() { return valorBanco; }
}

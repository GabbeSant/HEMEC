package com.example.mvphemec.model;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class Chamado {

    private Long id;

    @NotBlank(message = "Informe a descrição do problema")
    private String descricao;

    @NotNull(message = "Informe a data de abertura")
    private LocalDateTime dataAbertura;

    @NotNull(message = "Informe o status do chamado")
    private StatusChamado status;

    @NotNull(message = "Informe o equipamento")
    @Positive(message = "O ID do equipamento deve ser positivo")
    private Long equipamentoId;

    @NotNull(message = "Informe quem abriu o chamado")
    @Positive(message = "O ID do usuário deve ser positivo")
    private Long abertoPor;

    private String codigo;

    public Chamado() {
    }

    public Chamado(
            String descricao,
            Long equipamentoId,
            Long abertoPor
    ) {
        this.descricao = descricao;
        this.equipamentoId = equipamentoId;
        this.abertoPor = abertoPor;
        this.dataAbertura = LocalDateTime.now();
        this.status = StatusChamado.ABERTO;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public LocalDateTime getDataAbertura() {
        return dataAbertura;
    }

    public void setDataAbertura(LocalDateTime dataAbertura) {
        this.dataAbertura = dataAbertura;
    }

    public StatusChamado getStatus() {
        return status;
    }

    public void setStatus(StatusChamado status) {
        this.status = status;
    }

    public Long getEquipamentoId() {
        return equipamentoId;
    }

    public void setEquipamentoId(Long equipamentoId) {
        this.equipamentoId = equipamentoId;
    }

    public Long getAbertoPor() {
        return abertoPor;
    }

    public void setAbertoPor(Long abertoPor) {
        this.abertoPor = abertoPor;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }
}
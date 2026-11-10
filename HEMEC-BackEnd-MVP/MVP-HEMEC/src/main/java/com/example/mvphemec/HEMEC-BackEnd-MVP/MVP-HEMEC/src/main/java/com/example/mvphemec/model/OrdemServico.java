
package com.example.mvphemec.model;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class OrdemServico {

    private Long id;

    private String numeroOrdem;

    @NotNull(message = "Informe a data de abertura")
    private LocalDateTime dataAbertura;

    @NotNull(message = "Informe o status da ordem de serviço")
    private StatusOrdemServico status;

    @NotBlank(message = "Informe a descrição do serviço")
    private String descricaoServico;

    @NotNull(message = "Informe o equipamento")
    @Positive(message = "O ID do equipamento deve ser positivo")
    private Long equipamentoId;

    private Long chamadoId;

    private Long responsavelId;

    public OrdemServico() {
    }

    public OrdemServico(
            String descricaoServico,
            Long equipamentoId,
            Long chamadoId) {

        this.descricaoServico = descricaoServico;
        this.equipamentoId = equipamentoId;
        this.chamadoId = chamadoId;
        this.dataAbertura = LocalDateTime.now();
        this.status = StatusOrdemServico.ABERTA;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumeroOrdem() {
        return numeroOrdem;
    }

    public void setNumeroOrdem(String numeroOrdem) {
        this.numeroOrdem = numeroOrdem;
    }

    public LocalDateTime getDataAbertura() {
        return dataAbertura;
    }

    public void setDataAbertura(LocalDateTime dataAbertura) {
        this.dataAbertura = dataAbertura;
    }

    public StatusOrdemServico getStatus() {
        return status;
    }

    public void setStatus(StatusOrdemServico status) {
        this.status = status;
    }

    public String getDescricaoServico() {
        return descricaoServico;
    }

    public void setDescricaoServico(String descricaoServico) {
        this.descricaoServico = descricaoServico;
    }

    public Long getEquipamentoId() {
        return equipamentoId;
    }

    public void setEquipamentoId(Long equipamentoId) {
        this.equipamentoId = equipamentoId;
    }

    public Long getChamadoId() {
        return chamadoId;
    }

    public void setChamadoId(Long chamadoId) {
        this.chamadoId = chamadoId;
    }

    public Long getResponsavelId() {
        return responsavelId;
    }

    public void setResponsavelId(Long responsavelId) {
        this.responsavelId = responsavelId;
    }
}

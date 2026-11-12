package com.example.mvphemec.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Entity
@Table(name = "MANUTENCAO_PREVENTIVA")
public class ManutencaoPreventiva {

    @Id
    @Column(name = "id_manutencao_preventiva")
    private Integer id;

    @NotNull(message = "Informe a ordem de serviço")
    @ManyToOne
    @JoinColumn(name = "id_os", nullable = false)
    private OrdemServico ordemServico;

    @NotNull(message = "Informe o usuário responsável")
    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @NotNull(message = "Informe o status da substituição")
    @Convert(converter = StatusSubstituicaoConverter.class)
    @Column(name = "status_substituicao", nullable = false)
    private StatusSubstituicao statusSubstituicao;

    @NotNull(message = "Informe o status do checklist")
    @Convert(converter = StatusChecklistConverter.class)
    @Column(name = "cheklist_status", nullable = false)
    private StatusChecklist checklistStatus;

    @NotNull(message = "Informe a data de execução")
    @Column(name = "data_execucao", nullable = false)
    private LocalDateTime dataExecucao;

    public ManutencaoPreventiva() {}
}

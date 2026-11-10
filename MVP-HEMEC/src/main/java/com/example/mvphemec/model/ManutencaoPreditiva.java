package com.example.mvphemec.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "MANUTENCAO_PREDITIVA")
public class ManutencaoPreditiva {

    @Id
    @Column(name = "id_manutencao_preditiva")
    private Integer id;

    @NotNull(message = "Informe a ordem de serviço")
    @ManyToOne
    @JoinColumn(name = "id_os", nullable = false)
    private OrdemServico ordemServico;

    @NotNull(message = "Informe o usuário responsável")
    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @NotNull(message = "Informe a data de execução")
    @Column(name = "data_execucao", nullable = false)
    private LocalDateTime dataExecucao;

    public ManutencaoPreditiva() {}
}

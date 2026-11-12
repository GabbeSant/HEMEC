package com.example.mvphemec.model;

import java.time.LocalDateTime;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

@Entity
@Table(name = "ORDEM_SERVICO")
public class OrdemServico {

    @Id
    @Column(name = "id_os")
    private Integer id;

    @NotNull(message = "Informe a data de geração")
    @Column(name = "data_geracao", nullable = false)
    private LocalDateTime dataGeracao;

    @NotNull(message = "Informe o status da ordem de serviço")
    @Convert(converter = StatusOrdemServicoConverter.class)
    @Column(name = "status_os", nullable = false)
    private StatusOrdemServico status;

    @NotNull(message = "Informe o chamado relacionado")
    @ManyToOne
    @JoinColumn(name = "id_chamado", nullable = false)
    private Chamado chamado;

    @NotNull(message = "Informe a avaliação relacionada")
    @OneToOne
    @JoinColumn(name = "id_avaliacao", nullable = false, unique = true)
    private Avaliacao avaliacao;

    public OrdemServico() {
    }
}

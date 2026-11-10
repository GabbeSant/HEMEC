package com.example.mvphemec.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

// Entidade vinculada à tabela MANUTENCAO_CORRETIVA
@Getter
@Setter
@Entity
@Table(name = "MANUTENCAO_CORRETIVA")
public class ManutencaoCorretiva {

    @Id
    @Column(name = "id_manutencao_corretiva")
    private Integer id;

    @NotNull(message = "Informe a ordem de serviço")
    @ManyToOne
    @JoinColumn(name = "id_os", nullable = false)
    private OrdemServico ordemServico;

    @NotNull(message = "Informe o usuário responsável")
    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @NotBlank(message = "Informe a descrição do reparo")
    @Column(name = "descricao_reparo", nullable = false, length = 500, unique = true)
    private String descricaoReparo;

    @NotNull(message = "Informe o status atual")
    @Enumerated(EnumType.STRING)
    @Column(name = "status_atual", nullable = false)
    private StatusManutencaoCorretiva statusAtual;

    @NotBlank(message = "Informe os testes finais")
    @Column(name = "testes_finais", nullable = false, length = 500)
    private String testesFinais;

    @NotNull(message = "Informe a data de execução")
    @Column(name = "data_execucao", nullable = false)
    private LocalDateTime dataExecucao;

    public ManutencaoCorretiva() {}
}

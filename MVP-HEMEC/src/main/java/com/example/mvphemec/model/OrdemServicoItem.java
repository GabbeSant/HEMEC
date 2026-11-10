package com.example.mvphemec.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

// Entidade vinculada à tabela ORDEM_SERVICO_ITEM
@Getter
@Setter
@Entity
@Table(
    name = "ORDEM_SERVICO_ITEM",
    uniqueConstraints = @UniqueConstraint(
        columnNames = {"id_peca", "id_os"}
    )
)
public class OrdemServicoItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_os_item")
    private Integer id;

    @NotNull(message = "Informe a quantidade")
    @Positive(message = "A quantidade deve ser maior que zero")
    @Column(nullable = false)
    private Integer quantidade;

    @NotNull(message = "Informe a peça")
    @ManyToOne
    @JoinColumn(name = "id_peca", nullable = false)
    private Peca peca;

    @NotNull(message = "Informe a ordem de serviço")
    @ManyToOne
    @JoinColumn(name = "id_os", nullable = false)
    private OrdemServico ordemServico;

    public OrdemServicoItem() {}
}

package com.example.mvphemec.model;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "EQUIPAMENTO")
public class Equipamento {

    @Id
    @Column(name = "id_equipamento")
    private Integer id;

    @NotBlank(message = "Informe o número patrimonial")
    @Column(name = "num_patrimonio", nullable = false, unique = true, length = 50)
    private String numeroPatrimonial;

    @NotBlank(message = "Informe o modelo")
    @Column(name = "modelo", nullable = false, length = 100)
    private String modelo;

    @NotNull(message = "Informe o status atual")
    @Convert(converter = StatusEquipamentoConverter.class)
    @Column(name = "status_atual", nullable = false, length = 20)
    private StatusEquipamento statusAtual;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_setor")
    private Setor setor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_tipo")
    private TipoEquipamento tipoEquipamento;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_fabricante")
    private Fabricante fabricante;

    @NotNull(message = "Informe a criticidade")
    @Convert(converter = CriticidadeConverter.class)
    @Column(name = "criticidade", nullable = false, length = 1)
    private Criticidade criticidade;
}

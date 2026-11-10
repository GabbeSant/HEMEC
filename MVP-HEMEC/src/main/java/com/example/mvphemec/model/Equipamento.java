package com.example.mvphemec.model;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "equipamentos")
public class Equipamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Informe o número patrimonial")
    @Column(nullable = false, unique = true)
    private String numeroPatrimonial;

    @NotBlank(message = "Informe o número de série")
    @Column(nullable = false)
    private String numSerie;

    @NotBlank(message = "Informe o tipo do equipamento")
    @Column(nullable = false)
    private String tipoEquipamento;

    @NotBlank(message = "Informe o modelo")
    @Column(nullable = false)
    private String modelo;

    @NotNull(message = "Informe a criticidade")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Criticidade criticidade;

    @NotNull(message = "Informe o setor")
    // O relacionamento JPA com Setor será definido
    // quando conferirmos a classe Setor.
    @Transient
    private Setor setor;

    @NotNull(message = "Informe o fabricante")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Fabricante fabricante;

    @NotNull(message = "Informe o valor de aquisição")
    @PositiveOrZero(message = "O valor não pode ser negativo")
    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal valorAquisicao;

    @NotNull(message = "Informe a data de aquisição")
    private LocalDate dataAquisicao;

    public Equipamento() {
    }
}

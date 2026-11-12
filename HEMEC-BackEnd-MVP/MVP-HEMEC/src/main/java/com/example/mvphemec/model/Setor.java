package com.example.mvphemec.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "SETOR", uniqueConstraints = @UniqueConstraint(
        name = "uk_setor_unidade_nome", columnNames = {"id_unidade", "nome_setor"}))
public class Setor {

    @Id
    @Column(name = "id_setor")
    private Integer id;

    @NotNull(message = "Informe a unidade do setor")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_unidade", nullable = false)
    private Unidade unidade;

    @NotBlank(message = "Informe o nome do setor")
    @Column(name = "nome_setor", nullable = false, length = 100)
    private String nome;
}

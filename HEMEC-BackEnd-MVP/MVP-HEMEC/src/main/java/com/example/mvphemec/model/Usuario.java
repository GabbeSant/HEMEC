package com.example.mvphemec.model;

import jakarta.persistence.Column;
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
@Table(name = "USUARIO")
public class Usuario {

    @Id
    @Column(name = "id_usuario")
    private Integer id;

    @NotBlank(message = "Informe o nome do usuário")
    @Column(name = "nome_usuario", nullable = false, length = 100)
    private String nome;

    @NotNull(message = "Informe o setor do usuário")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_setor", nullable = false)
    private Setor setor;
}

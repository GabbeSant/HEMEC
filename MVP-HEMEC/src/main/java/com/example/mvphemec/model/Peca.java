package com.example.mvphemec.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

// Entidade vinculada à tabela PECA
@Getter
@Setter
@Entity
@Table(name = "PECA")
public class Peca {

    @Id
    @Column(name = "id_peca")
    private Integer id;

    @NotBlank(message = "Informe o código da peça")
    @Column(name = "codigo_peca", nullable = false)
    private String codigoPeca;

    @NotBlank(message = "Informe o nome da peça")
    @Column(name = "nome_peca", nullable = false)
    private String nomePeca;

    public Peca() {}
}

package com.example.mvphemec.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "UNIDADE")
public class Unidade {

    @Id
    @Column(name = "id_unidade")
    private Integer id;

    @NotBlank(message = "Informe o nome da unidade")
    @Column(name = "nome_unidade", nullable = false, unique = true, length = 100)
    private String nome;
}

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
@Table(name = "FABRICANTE")
public class Fabricante {

    @Id
    @Column(name = "id_fabricante")
    private Integer id;

    @NotBlank(message = "Informe o nome do fabricante")
    @Column(name = "nome_fabricante", nullable = false, unique = true, length = 100)
    private String nome;
}

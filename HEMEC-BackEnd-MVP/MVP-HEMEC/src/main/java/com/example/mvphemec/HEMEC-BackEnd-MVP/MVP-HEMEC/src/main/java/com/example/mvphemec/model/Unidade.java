
package com.example.mvphemec.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

// Gera automaticamente os getters e setters
@Getter
@Setter

// Representa a entidade Unidade vinculada à tabela UNIDADE
@Entity
@Table(name = "UNIDADE")
public class Unidade {

    // Identificador único da unidade
    @Id
    @Column(name = "id_unidade")
    private Integer id;

    // Nome da unidade hospitalar
    @NotBlank(message = "Informe o nome da unidade")
    @Column(name = "nome_unidade", nullable = false, unique = true)
    private String nomeUnidade;

    // Construtor padrão utilizado pelo JPA
    public Unidade() {
    }
}

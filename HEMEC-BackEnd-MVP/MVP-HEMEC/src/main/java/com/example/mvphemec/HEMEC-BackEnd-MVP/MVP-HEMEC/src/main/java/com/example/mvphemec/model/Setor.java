
package com.example.mvphemec.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

// Gera automaticamente os getters e setters
@Getter
@Setter

// Representa a entidade Setor vinculada à tabela SETOR
@Entity
@Table(name = "SETOR")
public class Setor {

    // Identificador único do setor
    @Id
    @Column(name = "id_setor")
    private Integer id;

    // Nome do setor dentro da unidade hospitalar
    @NotBlank(message = "Informe o nome do setor")
    @Column(name = "nome_setor", nullable = false)
    private String nomeSetor;

    // Relacionamento com a unidade hospitalar à qual o setor pertence
    @ManyToOne
    @JoinColumn(name = "id_unidade", nullable = false)
    private Unidade unidade;

    // Construtor padrão utilizado pelo JPA
    public Setor() {
    }
}

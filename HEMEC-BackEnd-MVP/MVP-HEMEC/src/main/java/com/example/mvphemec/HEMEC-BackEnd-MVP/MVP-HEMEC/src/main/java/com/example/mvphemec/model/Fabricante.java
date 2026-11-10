
package com.example.mvphemec.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

// Gera automaticamente os getters e setters
@Getter
@Setter

// Representa a entidade Fabricante vinculada à tabela FABRICANTE
@Entity
@Table(name = "FABRICANTE")
public class Fabricante {

    // Identificador único do fabricante
    @Id
    @Column(name = "id_fabricante")
    private Integer id;

    // Nome do fabricante do equipamento
    @NotBlank(message = "Informe o nome do fabricante")
    @Column(name = "nome_fabricante", nullable = false, unique = true)
    private String nomeFabricante;

    // Construtor padrão utilizado pelo JPA
    public Fabricante() {
    }
}

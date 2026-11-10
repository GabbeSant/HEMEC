
package com.example.mvphemec.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

// Gera automaticamente os getters e setters
@Getter
@Setter

// Representa a entidade vinculada à tabela USUARIO
@Entity
@Table(name = "USUARIO")
public class Usuario {

    // Identificador único do usuário
    @Id
    @Column(name = "id_usuario")
    private Integer id;

    // Nome do usuário cadastrado no sistema
    @NotBlank(message = "Informe o nome do usuário")
    @Column(name = "nome_usuario", nullable = false)
    private String nomeUsuario;

    // Setor ao qual o usuário pertence
    @ManyToOne
    @JoinColumn(name = "id_setor", nullable = false)
    private Setor setor;

    // Construtor padrão utilizado pelo JPA
    public Usuario() {
    }
}

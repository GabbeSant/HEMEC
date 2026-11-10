
package com.example.mvphemec.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

// Gera automaticamente os getters e setters
@Getter
@Setter

// Representa a entidade vinculada à tabela CHAMADO
@Entity
@Table(name = "CHAMADO")
public class Chamado {

    // Identificador único do chamado
    @Id
    @Column(name = "id_chamado")
    private Integer id;

    // Relacionamentos com o usuário responsável pela abertura e o equipamento
    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "id_equipamento", nullable = false)
    private Equipamento equipamento;

    // Informações referentes à abertura e situação do chamado
    @NotBlank(message = "Informe a descrição do problema")
    @Column(name = "descricao_problema", nullable = false, length = 500)
    private String descricaoProblema;

    @NotNull(message = "Informe a data de abertura")
    @Column(name = "data_abertura", nullable = false)
    private LocalDateTime dataAbertura;

    @NotNull(message = "Informe o status do chamado")
    @Enumerated(EnumType.STRING)
    @Column(name = "status_chamado", nullable = false)
    private StatusChamado status;

    // Construtor padrão utilizado pelo JPA
    public Chamado() {
    }
}

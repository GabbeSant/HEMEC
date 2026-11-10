
package com.example.mvphemec.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

// Gera automaticamente os métodos getters e setters
@Getter
@Setter

// Define a classe como uma entidade JPA vinculada à tabela EQUIPAMENTO
@Entity
@Table(name = "EQUIPAMENTO")
public class Equipamento {

    // Identificador único do equipamento no banco
    @Id
    @Column(name = "id_equipamento")
    private Integer id;

    // Identificação patrimonial do equipamento
    @NotBlank(message = "Informe o número patrimonial")
    @Column(name = "num_patrimonio", nullable = false, unique = true)
    private String numeroPatrimonial;

    // Informações básicas e situação atual do equipamento
    @NotBlank(message = "Informe o modelo")
    @Column(nullable = false)
    private String modelo;

    @NotBlank(message = "Informe o status atual")
    @Column(name = "status_atual", nullable = false)
    private String statusAtual;

    // Relacionamentos com as entidades de cadastro do sistema
    @ManyToOne
    @JoinColumn(name = "id_setor")
    private Setor setor;

    @ManyToOne
    @JoinColumn(name = "id_tipo")
    private TipoEquipamento tipoEquipamento;

    @ManyToOne
    @JoinColumn(name = "id_fabricante")
    private Fabricante fabricante;

    // Classificação de criticidade do equipamento
    @NotBlank(message = "Informe a criticidade")
    @Column(nullable = false)
    private String criticidade;

    // Construtor padrão utilizado pelo JPA
    public Equipamento() {
    }
}

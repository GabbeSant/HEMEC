
package com.example.mvphemec.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

// Gera automaticamente os getters e setters
@Getter
@Setter

// Representa a entidade vinculada à tabela TIPO_EQUIPAMENTO
@Entity
@Table(name = "TIPO_EQUIPAMENTO")
public class TipoEquipamento {

    // Identificador único do tipo de equipamento
    @Id
    @Column(name = "id_tipo")
    private Integer id;

    // Categoria do equipamento
    @NotBlank(message = "Informe o tipo de equipamento")
    @Column(nullable = false)
    private String tipo;

    // Descrição detalhada do tipo de equipamento
    @NotBlank(message = "Informe a descrição do tipo")
    @Column(nullable = false)
    private String descricao;

    // Construtor padrão utilizado pelo JPA
    public TipoEquipamento() {
    }
}

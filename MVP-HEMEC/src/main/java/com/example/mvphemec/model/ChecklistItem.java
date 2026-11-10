package com.example.mvphemec.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "CHECKLIST_ITEM")
public class ChecklistItem {

    @Id
    @Column(name = "id_item")
    private Integer id;

    @NotNull(message = "Informe o tipo de teste")
    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_teste", nullable = false)
    private TipoTeste tipoTeste;

    @NotBlank(message = "Informe a descrição do teste")
    @Column(name = "descricao_teste", nullable = false)
    private String descricaoTeste;

    @NotNull(message = "Informe a manutenção preventiva relacionada")
    @OneToOne
    @JoinColumn(name = "id_manutencao_preventiva", nullable = false, unique = true)
    private ManutencaoPreventiva manutencaoPreventiva;

    public ChecklistItem() {}
}

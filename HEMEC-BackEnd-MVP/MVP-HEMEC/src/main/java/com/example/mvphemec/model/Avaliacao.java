package com.example.mvphemec.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

@Entity
@Table(name = "AVALIACAO")
public class Avaliacao {

    @Id
    @Column(name = "id_avaliacao")
    private Integer id;

    @NotNull(message = "Informe o chamado relacionado")
    @ManyToOne
    @JoinColumn(name = "id_chamado", nullable = false)
    private Chamado chamado;

    @NotNull(message = "Informe o nível de urgência")
    @Column(name = "nivel_urgencia", nullable = false)
    private Boolean nivelUrgencia;

    public Avaliacao() {
    }
}

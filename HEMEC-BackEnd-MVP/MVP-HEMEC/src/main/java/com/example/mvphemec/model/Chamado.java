package com.example.mvphemec.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

@Entity
@Table(name = "CHAMADO")
public class Chamado {

    @Id
    @Column(name = "id_chamado")
    private Integer id;

    @NotBlank(message = "Informe a descrição do problema")
    @Column(name = "descricao_problema", nullable = false, length = 500)
    private String descricaoProblema;

    @NotNull(message = "Informe a data de abertura")
    @Column(name = "data_abertura", nullable = false)
    private LocalDateTime dataAbertura;

    @NotNull(message = "Informe o status do chamado")
    @Convert(converter = StatusChamadoConverter.class)
    @Column(name = "status_chamado", nullable = false)
    private StatusChamado status;

    @NotNull(message = "Informe quem abriu o chamado")
    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @NotNull(message = "Informe o equipamento")
    @ManyToOne
    @JoinColumn(name = "id_equipamento", nullable = false)
    private Equipamento equipamento;

    public Chamado() {
    }
}

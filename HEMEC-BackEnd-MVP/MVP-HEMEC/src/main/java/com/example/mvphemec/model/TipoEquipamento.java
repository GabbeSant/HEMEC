package com.example.mvphemec.model;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "TIPO_EQUIPAMENTO")
public class TipoEquipamento {

    @Id
    @Column(name = "id_tipo")
    private Integer id;

    @NotNull(message = "Informe o tipo do equipamento")
    @Convert(converter = TipoEquipamentoValorConverter.class)
    @Column(name = "tipo", nullable = false, length = 20)
    private Valor tipo;

    @NotBlank(message = "Informe a descrição do tipo de equipamento")
    @Column(name = "descricao", nullable = false, length = 255)
    private String descricao;

    public enum Valor {
        ELETRICO("Elétrico"),
        MECANICO("Mecânico"),
        HIDRAULICO("Hidráulico"),
        ELETRONICO("Eletrônico"),
        OUTRO("Outro");

        private final String valorBanco;

        Valor(String valorBanco) {
            this.valorBanco = valorBanco;
        }

        public String getValorBanco() {
            return valorBanco;
        }
    }
}


package com.example.mvphemec.controller;

import com.example.mvphemec.model.Chamado;
import com.example.mvphemec.service.ChamadoService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.NotBlank;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/chamados")
public class ChamadoController {

    private final ChamadoService chamadoService;

    public ChamadoController(ChamadoService chamadoService) {
        this.chamadoService = chamadoService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Chamado abrirChamado(@Valid @RequestBody NovoChamadoRequest request) {
        System.out.println("ENTROU NO MÉTODO abrirChamado");
        if (request.equipamentoId() == null || request.equipamentoId() <= 0) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Informe um ID de equipamento válido"
            );
        }

        if (request.abertoPor() == null || request.abertoPor() <= 0) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Informe um ID de usuário válido"
            );
        }

        return chamadoService.abrirChamado(
                request.descricao(),
                request.equipamentoId(),
                request.abertoPor()
        );
    }

    public record NovoChamadoRequest(
            @NotBlank(message = "Informe a descrição do problema")
            String descricao,

            @NotNull(message = "Informe o equipamento")
            @Positive(message = "O ID do equipamento deve ser positivo")
            Long equipamentoId,

            @NotNull(message = "Informe quem abriu o chamado")
            @Positive(message = "O ID do usuário deve ser positivo")
            Long abertoPor
    ) {

    }
    @GetMapping
    public List<Chamado> listarChamados() {
        return chamadoService.listarChamados();
    }
}

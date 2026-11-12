
package com.example.mvphemec.controller;

import com.example.mvphemec.model.Chamado;
import com.example.mvphemec.service.ChamadoService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/chamados")
public class ChamadoController {

    private final ChamadoService chamadoService;

    public ChamadoController(ChamadoService chamadoService) {
        this.chamadoService = chamadoService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ChamadoResponse abrirChamado(@Valid @RequestBody NovoChamadoRequest request) {
        return response(chamadoService.abrirChamado(
                request.id(),
                request.descricao(),
                request.equipamentoId(),
                request.abertoPor()
        ));
    }

    public record NovoChamadoRequest(
            @NotNull(message = "Informe o ID do chamado")
            @Positive(message = "O ID do chamado deve ser positivo")
            Integer id,

            @NotBlank(message = "Informe a descrição do problema")
            @Size(max = 500, message = "A descrição deve ter no máximo 500 caracteres")
            String descricao,

            @NotNull(message = "Informe o equipamento")
            @Positive(message = "O ID do equipamento deve ser positivo")
            Integer equipamentoId,

            @NotNull(message = "Informe quem abriu o chamado")
            @Positive(message = "O ID do usuário deve ser positivo")
            Integer abertoPor
    ) {

    }
    @GetMapping
    public List<ChamadoResponse> listarChamados() {
        return chamadoService.listarChamados().stream().map(this::response).toList();
    }

    private ChamadoResponse response(Chamado chamado) {
        return new ChamadoResponse(chamado.getId(), chamado.getDescricaoProblema(), chamado.getDataAbertura(),
                chamado.getStatus(), chamado.getEquipamento().getId(), chamado.getUsuario().getId());
    }

    public record ChamadoResponse(Integer id, String descricao, LocalDateTime dataAbertura,
                                  com.example.mvphemec.model.StatusChamado status,
                                  Integer equipamentoId, Integer usuarioId) {}
}


package com.example.mvphemec.controller;

import com.example.mvphemec.model.Equipamento;
import com.example.mvphemec.model.Fabricante;
import com.example.mvphemec.model.Criticidade;
import com.example.mvphemec.model.Setor;
import com.example.mvphemec.model.StatusEquipamento;
import com.example.mvphemec.model.TipoEquipamento;
import com.example.mvphemec.service.EquipamentoService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.validation.annotation.Validated;

import java.util.List;

@RestController
@Validated
@RequestMapping("/api/equipamentos")
public class EquipamentoController {

    private final EquipamentoService equipamentoService;

    public EquipamentoController(EquipamentoService equipamentoService) {
        this.equipamentoService = equipamentoService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public EquipamentoResponse cadastrarEquipamento(@Valid @RequestBody NovoEquipamentoRequest request) {
        Equipamento equipamento = new Equipamento();
        equipamento.setId(request.id());
        equipamento.setNumeroPatrimonial(request.numeroPatrimonial());
        equipamento.setModelo(request.modelo());
        equipamento.setStatusAtual(request.statusAtual());
        equipamento.setCriticidade(request.criticidade());

        if (request.setorId() != null) {
            Setor setor = new Setor();
            setor.setId(request.setorId());
            equipamento.setSetor(setor);
        }
        if (request.tipoId() != null) {
            TipoEquipamento tipo = new TipoEquipamento();
            tipo.setId(request.tipoId());
            equipamento.setTipoEquipamento(tipo);
        }
        if (request.fabricanteId() != null) {
            Fabricante fabricante = new Fabricante();
            fabricante.setId(request.fabricanteId());
            equipamento.setFabricante(fabricante);
        }
        return response(equipamentoService.cadastrarEquipamento(equipamento));
    }

    @GetMapping
    public List<EquipamentoResponse> listarEquipamentos() {
        return equipamentoService.listarEquipamentos().stream().map(this::response).toList();
    }

    @GetMapping("/{id}")
    public EquipamentoResponse buscarPorId(@PathVariable @Positive Integer id) {
        Equipamento equipamento = equipamentoService.buscarPorId(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Equipamento não encontrado"));
        return response(equipamento);
    }

    private EquipamentoResponse response(Equipamento equipamento) {
        return new EquipamentoResponse(
                equipamento.getId(), equipamento.getNumeroPatrimonial(), equipamento.getModelo(),
                equipamento.getStatusAtual(), idDo(equipamento.getSetor()), idDo(equipamento.getTipoEquipamento()),
                idDo(equipamento.getFabricante()), equipamento.getCriticidade());
    }

    private Integer idDo(Setor setor) { return setor == null ? null : setor.getId(); }
    private Integer idDo(TipoEquipamento tipo) { return tipo == null ? null : tipo.getId(); }
    private Integer idDo(Fabricante fabricante) { return fabricante == null ? null : fabricante.getId(); }

    public record NovoEquipamentoRequest(
            @NotNull @Positive Integer id,
            @NotBlank @Size(max = 50) String numeroPatrimonial,
            @NotBlank @Size(max = 100) String modelo,
            @NotNull StatusEquipamento statusAtual,
            Integer setorId,
            Integer tipoId,
            Integer fabricanteId,
            @NotNull Criticidade criticidade) {}

    public record EquipamentoResponse(
            Integer id,
            String numeroPatrimonial,
            String modelo,
            StatusEquipamento statusAtual,
            Integer setorId,
            Integer tipoId,
            Integer fabricanteId,
            Criticidade criticidade) {}
}

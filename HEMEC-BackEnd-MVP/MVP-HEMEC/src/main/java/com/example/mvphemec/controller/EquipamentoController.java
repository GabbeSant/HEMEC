
package com.example.mvphemec.controller;

import com.example.mvphemec.model.Equipamento;
import com.example.mvphemec.service.EquipamentoService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/equipamentos")
public class EquipamentoController {

    private final EquipamentoService equipamentoService;

    public EquipamentoController(EquipamentoService equipamentoService) {
        this.equipamentoService = equipamentoService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Equipamento cadastrarEquipamento(
            @Valid @RequestBody Equipamento equipamento) {

        return equipamentoService.cadastrarEquipamento(equipamento);
    }

    @GetMapping
    public List<Equipamento> listarEquipamentos() {
        return equipamentoService.listarEquipamentos();
    }

    @GetMapping("/{id}")
    public Equipamento buscarPorId(@PathVariable Long id) {
        return equipamentoService.buscarPorId(id);
    }
}

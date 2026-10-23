
package com.example.mvphemec.controller;

import com.example.mvphemec.model.OrdemServico;
import com.example.mvphemec.service.OrdemServicoService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/ordens-servico")
public class OrdemServicoController {

    private final OrdemServicoService ordemServicoService;

    public OrdemServicoController(OrdemServicoService ordemServicoService) {
        this.ordemServicoService = ordemServicoService;
    }

    @GetMapping
    public List<OrdemServico> listarOrdensServico() {
        return ordemServicoService.listarOrdensServico();
    }
}

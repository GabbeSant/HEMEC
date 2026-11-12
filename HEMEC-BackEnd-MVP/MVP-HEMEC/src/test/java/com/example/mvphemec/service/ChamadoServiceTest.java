package com.example.mvphemec.service;

import com.example.mvphemec.model.Chamado;
import com.example.mvphemec.model.Criticidade;
import com.example.mvphemec.model.Equipamento;
import com.example.mvphemec.model.StatusEquipamento;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

class ChamadoServiceTest {

    @Test
    void deveAbrirChamadoSemCriarOrdemServico() {
        OrdemServicoService ordemServicoService = new OrdemServicoService();
        EquipamentoService equipamentoService = new EquipamentoService();

        Equipamento equipamento = new Equipamento();
        equipamento.setId(1);
        equipamento.setNumeroPatrimonial("HEMEC-TEST-001");
        equipamento.setModelo("MX450");
        equipamento.setStatusAtual(StatusEquipamento.ATIVO);
        equipamento.setCriticidade(Criticidade.ALTA);
        equipamentoService.cadastrarEquipamento(equipamento);

        ChamadoService chamadoService = new ChamadoService(equipamentoService);
        Chamado chamado = chamadoService.abrirChamado(10, "Equipamento não liga", 1, 2);

        assertNotNull(chamado.getId());
        assertEquals("Equipamento não liga", chamado.getDescricaoProblema());
        assertEquals(equipamento, chamado.getEquipamento());
        assertEquals(2, chamado.getUsuario().getId());
        assertTrue(ordemServicoService.listarOrdensServico().isEmpty());
    }

    @Test
    void naoDeveCriarChamadoParaEquipamentoInexistente() {
        EquipamentoService equipamentoService = new EquipamentoService();
        ChamadoService chamadoService = new ChamadoService(equipamentoService);

        assertThrows(
                org.springframework.web.server.ResponseStatusException.class,
                () -> chamadoService.abrirChamado(10, "Equipamento não liga", 999, 2)
        );
        assertTrue(chamadoService.listarChamados().isEmpty());
    }
}

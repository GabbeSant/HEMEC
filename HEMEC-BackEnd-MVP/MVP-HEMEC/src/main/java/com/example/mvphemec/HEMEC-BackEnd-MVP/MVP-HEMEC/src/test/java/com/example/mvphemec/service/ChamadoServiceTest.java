
package com.example.mvphemec.service;

import com.example.mvphemec.model.Chamado;
import com.example.mvphemec.model.OrdemServico;
import com.example.mvphemec.model.Equipamento;
import com.example.mvphemec.model.Criticidade;
import com.example.mvphemec.model.Setor;
import com.example.mvphemec.model.Fabricante;

import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class ChamadoServiceTest {

    @Test
    void deveCriarOrdemServicoAoAbrirChamado() {

        OrdemServicoService ordemServicoService =
                new OrdemServicoService();

        EquipamentoService equipamentoService =
                new EquipamentoService();

        Equipamento equipamento = new Equipamento();

        equipamento.setNumeroPatrimonial("HEMEC-TEST-001");
        equipamento.setNumSerie("SN-TEST-001");
        equipamento.setTipoEquipamento("Monitor Multiparametrico");
        equipamento.setModelo("MX450");
        equipamento.setCriticidade(Criticidade.ALTA);
        equipamento.setSetor(Setor.UTIADULTO);
        equipamento.setFabricante(Fabricante.PHILIPS);
        equipamento.setValorAquisicao(new BigDecimal("15000.00"));
        equipamento.setDataAquisicao(LocalDate.of(2025, 1, 15));

        equipamentoService.cadastrarEquipamento(equipamento);

        ChamadoService chamadoService =
                new ChamadoService(
                        ordemServicoService,
                        equipamentoService
                );

        Chamado chamado = chamadoService.abrirChamado(
                "Equipamento nao liga",
                equipamento.getId(),
                2L
        );

        List<OrdemServico> ordens =
                ordemServicoService.listarOrdensServico();

        assertEquals(1, ordens.size());

        OrdemServico ordem = ordens.get(0);

        assertEquals(chamado.getId(), ordem.getChamadoId());
        assertEquals(chamado.getEquipamentoId(), ordem.getEquipamentoId());
        assertEquals(chamado.getDescricao(), ordem.getDescricaoServico());
        assertNull(ordem.getResponsavelId());
    }

    @Test
    void naoDeveCriarChamadoParaEquipamentoInexistente() {

        OrdemServicoService ordemServicoService =
                new OrdemServicoService();

        EquipamentoService equipamentoService =
                new EquipamentoService();

        ChamadoService chamadoService =
                new ChamadoService(
                        ordemServicoService,
                        equipamentoService
                );

        assertThrows(
                org.springframework.web.server.ResponseStatusException.class,
                () -> chamadoService.abrirChamado(
                        "Equipamento nao liga",
                        999L,
                        2L
                )
        );

        assertTrue(chamadoService.listarChamados().isEmpty());
        assertTrue(ordemServicoService.listarOrdensServico().isEmpty());
    }

}

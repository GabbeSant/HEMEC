
package com.example.mvphemec.service;

import com.example.mvphemec.model.Chamado;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;
import com.example.mvphemec.model.Equipamento;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ChamadoService {

    private final OrdemServicoService ordemServicoService;

    private final EquipamentoService equipamentoService;

    private final List<Chamado> chamados = new ArrayList<>();

    private Long proximoIdChamado = 1L;

    public ChamadoService(
            OrdemServicoService ordemServicoService,
            EquipamentoService equipamentoService) {

        this.ordemServicoService = ordemServicoService;
        this.equipamentoService = equipamentoService;
    }

    public Chamado abrirChamado(
            String descricao,
            Long equipamentoId,
            Long abertoPor) {

        Chamado chamado = new Chamado(
                descricao,
                equipamentoId,
                abertoPor
        );

        chamado.setId(proximoIdChamado++);
        chamado.setCodigo(gerarCodigoUnico());
        chamados.add(chamado);

        ordemServicoService.criarOrdemServico(
                descricao,
                equipamentoId,
                chamado.getId()
        );

        return chamado;
    }

    public List<Chamado> listarChamados() {
        return new ArrayList<>(chamados);
    }

    private String gerarCodigoUnico() {
        while (true) {
            final String codigo = String.format(
                    "%06d",
                    ThreadLocalRandom.current().nextInt(1_000_000)
            );

            boolean existe = chamados.stream()
                    .anyMatch(chamado -> codigo.equals(chamado.getCodigo()));

            if (!existe) {
                return codigo;
            }
        }
    }
}

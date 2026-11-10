
package com.example.mvphemec.service;

import com.example.mvphemec.model.OrdemServico;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrdemServicoService {

    private final List<OrdemServico> ordensServico = new ArrayList<>();

    private Long proximoId = 1L;

    public OrdemServico criarOrdemServico(
            String descricaoServico,
            Long equipamentoId,
            Long chamadoId) {

        OrdemServico ordemServico = new OrdemServico(
                descricaoServico,
                equipamentoId,
                chamadoId
        );

        ordemServico.setId(proximoId++);

        ordensServico.add(ordemServico);

        return ordemServico;
    }

    public List<OrdemServico> listarOrdensServico() {
        return new ArrayList<>(ordensServico);
    }
}


package com.example.mvphemec.service;

import com.example.mvphemec.model.OrdemServico;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.ArrayList;

@Service
public class OrdemServicoService {

    private final List<OrdemServico> ordensServico = new ArrayList<>();

    public List<OrdemServico> listarOrdensServico() {
        return new ArrayList<>(ordensServico);
    }
}

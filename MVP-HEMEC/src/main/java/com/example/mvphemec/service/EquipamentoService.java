
package com.example.mvphemec.service;

import com.example.mvphemec.model.Equipamento;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EquipamentoService {

    private final List<Equipamento> equipamentos = new ArrayList<>();

    private Long proximoId = 1L;

    public Equipamento cadastrarEquipamento(Equipamento equipamento) {

        equipamento.setId(proximoId++);

        equipamentos.add(equipamento);

        return equipamento;
    }

    public List<Equipamento> listarEquipamentos() {
        return new ArrayList<>(equipamentos);
    }

    public Equipamento buscarPorId(Long id) {
        return equipamentos.stream()
                .filter(equipamento -> equipamento.getId().equals(id))
                .findFirst()
                .orElse(null);
    }
}

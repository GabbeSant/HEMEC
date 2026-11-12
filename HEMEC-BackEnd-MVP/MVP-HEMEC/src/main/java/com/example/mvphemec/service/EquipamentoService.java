
package com.example.mvphemec.service;

import com.example.mvphemec.model.Equipamento;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Objects;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@Service
public class EquipamentoService {

    private final List<Equipamento> equipamentos = new ArrayList<>();

    public Equipamento cadastrarEquipamento(Equipamento equipamento) {
        boolean idJaExiste = equipamentos.stream()
                .anyMatch(item -> Objects.equals(equipamento.getId(), item.getId()));
        boolean patrimonioJaExiste = equipamentos.stream()
                .anyMatch(item -> Objects.equals(equipamento.getNumeroPatrimonial(), item.getNumeroPatrimonial()));
        if (idJaExiste || patrimonioJaExiste) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    idJaExiste ? "ID de equipamento já cadastrado" : "Número patrimonial já cadastrado");
        }
        equipamentos.add(equipamento);
        return equipamento;
    }

    public List<Equipamento> listarEquipamentos() {
        return new ArrayList<>(equipamentos);
    }

    public Optional<Equipamento> buscarPorId(Integer id) {
        return equipamentos.stream()
                .filter(equipamento -> id.equals(equipamento.getId()))
                .findFirst();
    }
}

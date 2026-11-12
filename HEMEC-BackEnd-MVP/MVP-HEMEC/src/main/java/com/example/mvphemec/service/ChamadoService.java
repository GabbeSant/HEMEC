
package com.example.mvphemec.service;

import com.example.mvphemec.model.Chamado;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.time.LocalDateTime;
import com.example.mvphemec.model.Equipamento;
import com.example.mvphemec.model.StatusChamado;
import com.example.mvphemec.model.Usuario;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ChamadoService {

    private final EquipamentoService equipamentoService;

    private final List<Chamado> chamados = new ArrayList<>();

    public ChamadoService(
            EquipamentoService equipamentoService) {
        this.equipamentoService = equipamentoService;
    }

    public Chamado abrirChamado(
            Integer chamadoId,
            String descricao,
            Integer equipamentoId,
            Integer abertoPor) {
        Equipamento equipamento = equipamentoService.buscarPorId(equipamentoId).orElse(null);
        if (equipamento == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Equipamento não encontrado");
        }
        if (chamados.stream().anyMatch(item -> chamadoId.equals(item.getId()))) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "ID de chamado já cadastrado");
        }

        Usuario usuario = new Usuario();
        usuario.setId(abertoPor);

        Chamado chamado = new Chamado();
        chamado.setId(chamadoId);
        chamado.setDescricaoProblema(descricao);
        chamado.setDataAbertura(LocalDateTime.now());
        chamado.setStatus(StatusChamado.ABERTO);
        chamado.setUsuario(usuario);
        chamado.setEquipamento(equipamento);
        chamados.add(chamado);
        return chamado;
    }

    public List<Chamado> listarChamados() {
        return new ArrayList<>(chamados);
    }
}

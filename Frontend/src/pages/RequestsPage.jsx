import React from "react";
import { useRequests } from "../hooks/useRequests";
import RequestList from "../components/requests/RequestList";
import "./RequestsPage.css";

export default function RequestsPage({
  createdId,
  statusFilter = "",
  idFilter = "",
}) {
  const { status, requests, retry } = useRequests();
  const filtered = requests.filter(
    (request) =>
      (!statusFilter || request.status === statusFilter) &&
      (!idFilter || request.id === idFilter),
  );
  return (
    <div className="requests-page">
      <a href="#/dashboard">Voltar à dashboard</a>
      <header className="requests-heading">
        <h1>Chamados</h1>
        <a className="button button-primary" href="#/chamados/novo">
          Novo chamado
        </a>
      </header>
      {(statusFilter || idFilter) && (
        <div className="requests-active-filter">
          <span>
            {idFilter ? "Chamado selecionado" : `Situação: ${statusFilter}`}
          </span>
          <a href="#/chamados">Limpar filtro</a>
        </div>
      )}
      {createdId && requests.some((item) => item.id === createdId) && (
        <p className="request-success" role="status">
          Chamado registrado com sucesso neste navegador.{" "}
          <a href={`#/chamados/${encodeURIComponent(createdId)}`}>Consultar chamado registrado</a>
        </p>
      )}
      {status === "loading" ? (
        <p role="status">Carregando chamados…</p>
      ) : status === "error" ? (
        <div>
          <p role="alert">
            Não foi possível ler os chamados salvos neste navegador. Os
            registros não foram substituídos.
          </p>
          <button type="button" onClick={retry}>
            Tentar novamente
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <p role="status">
          {requests.length
            ? "Nenhum chamado encontrado para este filtro."
            : "Nenhum chamado registrado. Use Novo chamado para registrar uma necessidade."}
        </p>
      ) : (
        <RequestList requests={filtered} />
      )}
    </div>
  );
}

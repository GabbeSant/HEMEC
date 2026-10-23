import React from "react";
import { useRequests } from "../hooks/useRequests";
import "./RequestsPage.css";

export default function RequestsPage({ createdId, statusFilter = "", idFilter = "" }) {
  const { status, requests, retry } = useRequests();
  const filtered = requests.filter((request) =>
    (!statusFilter || request.status === statusFilter) && (!idFilter || request.id === idFilter),
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
          <span>{idFilter ? "Chamado selecionado" : `Situação: ${statusFilter}`}</span>
          <a href="#/chamados">Limpar filtro</a>
        </div>
      )}
      {createdId && requests.some((item) => item.id === createdId) && (
        <p role="status">Chamado registrado com sucesso.</p>
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
        <ul className="requests-list">
          {[...filtered].reverse().map((request) => (
            <li key={request.id}>
              <h2>{request.reference}</h2>
              <h3>
                {request.asset} — {request.equipmentName}
              </h3>
              <p className="request-problem">{request.description}</p>
              <dl>
                <div>
                  <dt>Setor da abertura</dt>
                  <dd>{request.sector}</dd>
                </div>
                <div>
                  <dt>Solicitante</dt>
                  <dd>{request.requester.email}</dd>
                </div>
                <div>
                  <dt>Situação</dt>
                  <dd>{request.status}</dd>
                </div>
                <div>
                  <dt>Data da abertura</dt>
                  <dd>
                    <time dateTime={request.createdAt}>
                      {new Intl.DateTimeFormat("pt-BR", {
                        dateStyle: "short",
                        timeStyle: "short",
                      }).format(new Date(request.createdAt))}
                    </time>
                  </dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

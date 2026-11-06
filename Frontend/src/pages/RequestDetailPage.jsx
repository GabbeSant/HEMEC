import React from "react";
import { useRequests } from "../hooks/useRequests";
import { formatDateTime } from "../utils/formatDateTime";
import "./RequestsPage.css";

export default function RequestDetailPage({ requestId }) {
  const { status, requests, retry } = useRequests();
  const request = requests.find((item) => item.id === requestId);

  return (
    <div className="requests-page">
      <a href="#/chamados">Voltar aos chamados</a>
      <header><h1>Detalhes do chamado</h1></header>
      {status === "loading" ? (
        <p role="status">Carregando chamado…</p>
      ) : status === "error" ? (
        <div>
          <p role="alert">Não foi possível ler os chamados deste navegador. Os registros não foram substituídos.</p>
          <button type="button" onClick={retry}>Tentar novamente</button>
        </div>
      ) : !request ? (
        <p role="status">Chamado não encontrado nos registros deste navegador.</p>
      ) : (
        <>
          <section className="request-detail-section" aria-labelledby="request-detail-title">
            <h2 id="request-detail-title">{request.reference}</h2>
            <dl className="request-detail-facts">
              <div><dt>Equipamento na abertura</dt><dd>{request.asset} — {request.equipmentName}</dd></div>
              <div><dt>Situação</dt><dd>{request.status}</dd></div>
              <div><dt>Setor da abertura</dt><dd>{request.sector}</dd></div>
              <div><dt>Solicitante</dt><dd>{request.requester.name} · {request.requester.email}</dd></div>
              <div><dt>Data da abertura</dt><dd><time dateTime={request.createdAt}>{formatDateTime(request.createdAt)}</time></dd></div>
            </dl>
            <a href={`#/equipamentos/${encodeURIComponent(request.equipmentId)}`}>Ver ficha e histórico do equipamento</a>
          </section>
          <section className="request-detail-section" aria-labelledby="request-problem-title">
            <h2 id="request-problem-title">Problema relatado</h2>
            <p className="request-problem">{request.description}</p>
          </section>
          <p className="request-local-note">
            Registro local deste navegador. A relação com ordens de serviço ainda não está disponível;
            registrar este chamado não gera uma OS.
          </p>
        </>
      )}
    </div>
  );
}

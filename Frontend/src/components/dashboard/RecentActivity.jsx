import React from "react";

export default function RecentActivity({ source }) {
  const { status, requests, retry } = source;
  const recent = [...requests].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)).slice(0, 4);
  return (
    <section className="dashboard-recent" aria-labelledby="dashboard-recent-title">
      <header className="dashboard-section-heading"><div><h2 id="dashboard-recent-title">Atividade recente</h2><p>Últimos chamados registrados</p></div><a href="#/chamados">Ver todos</a></header>
      {status === "loading" ? <p className="work-order-feedback" role="status">Carregando atividade recente…</p> : status === "error" ? (
        <div className="work-order-feedback"><p role="alert">Não foi possível consultar a atividade recente.</p><button className="work-order-retry" type="button" onClick={retry}>Tentar novamente</button></div>
      ) : recent.length === 0 ? (
        <div className="work-order-feedback"><p>Nenhum chamado registrado.</p><a href="#/chamados/novo">Abrir um chamado</a></div>
      ) : (
        <ul className="dashboard-activity-list">{recent.map((request) => (
          <li key={request.id}>
            <a href={`#/chamados?id=${encodeURIComponent(request.id)}`} aria-label={`Consultar ${request.reference}: ${request.equipmentName}`}>Chamado registrado</a>
            <p>{request.asset} — {request.equipmentName}</p>
            <span>{request.sector}</span>
            <time dateTime={request.createdAt}>{new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(new Date(request.createdAt))}</time>
          </li>
        ))}</ul>
      )}
    </section>
  );
}

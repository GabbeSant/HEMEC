import React from "react";
import { filterWorkOrders } from "../../utils/filterWorkOrders";

function Indicator({ label, value, status, href, id }) {
  return (
    <div>
      <dt>{status === "success" ? <a className="dashboard-indicator-link" href={href} aria-describedby={id}>{label}</a> : label}</dt>
      <dd id={id}>{status === "success" ? value.toLocaleString("pt-BR") : <><span aria-hidden="true">—</span><span className="dashboard-sr-only">{status === "loading" ? "Carregando" : "Não disponível"}</span></>}</dd>
    </div>
  );
}

export default function DashboardIndicators({ requestsSource, ordersSource, equipmentSource }) {
  const orders = ordersSource.data ?? [];
  const equipment = equipmentSource.equipment;
  const unavailable = equipment.filter((item) => item.status === "Indisponível").length;
  const sources = [["chamados", requestsSource], ["ordens de serviço", ordersSource], ["equipamentos", equipmentSource]];
  return (
    <section className="dashboard-summary" aria-labelledby="dashboard-summary-title">
      <h2 id="dashboard-summary-title">Indicadores operacionais</h2>
      <dl className="dashboard-indicators">
        <Indicator label="Chamados abertos" value={requestsSource.requests.filter((item) => item.status === "Aberto").length} status={requestsSource.status} href="#/chamados?situacao=Aberto" id="dashboard-open-requests-value" />
        <Indicator label="OS em atendimento" value={filterWorkOrders(orders, { status: "Em atendimento" }).length} status={ordersSource.status} href={`#/ordens-servico?situacao=${encodeURIComponent("Em atendimento")}`} id="dashboard-active-orders-value" />
        <Indicator label="OS de prioridade alta" value={filterWorkOrders(orders, { priority: "Alta", pending: true }).length} status={ordersSource.status} href="#/ordens-servico?prioridade=Alta&pendentes=1" id="dashboard-priority-orders-value" />
        <Indicator label="Equipamentos indisponíveis" value={unavailable} status={equipmentSource.status} href={`#/equipamentos?situacao=${encodeURIComponent("Indisponível")}`} id="dashboard-unavailable-equipment-value" />
      </dl>
      <div className="dashboard-indicator-feedback">
        {sources.filter(([, source]) => source.status === "loading").map(([label]) => <p key={label} role="status">Carregando indicadores de {label}…</p>)}
        {sources.filter(([, source]) => source.status === "error").map(([label, source]) => (
          <div className="dashboard-indicator-error" key={label}><p role="alert">Não foi possível carregar os indicadores de {label}.</p><button type="button" onClick={source.retry}>Tentar novamente</button></div>
        ))}
        {equipmentSource.status === "success" && equipment.length === 0 && <p role="status">Nenhum equipamento cadastrado.</p>}
      </div>
    </section>
  );
}

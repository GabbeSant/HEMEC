import React from "react";
import { useEquipment } from "../hooks/useEquipment";
import { useRequests } from "../hooks/useRequests";
import { useWorkOrders } from "../hooks/useWorkOrders";
import RequestList from "../components/requests/RequestList";
import WorkOrderList from "../components/work-orders/WorkOrderList";
import "./EquipmentPage.css";
import "./RequestsPage.css";

function EquipmentHistory({ equipmentId }) {
  const requestsSource = useRequests();
  const ordersSource = useWorkOrders();
  const requests = requestsSource.requests.filter((item) => item.equipmentId === equipmentId);
  const orders = (ordersSource.data ?? []).filter((item) => item.equipmentId === equipmentId);

  return (
    <div className="equipment-history">
      <section aria-labelledby="equipment-requests-title">
        <h2 id="equipment-requests-title">Chamados do equipamento</h2>
        {requestsSource.status === "loading" ? (
          <p role="status">Carregando chamados…</p>
        ) : requestsSource.status === "error" ? (
          <div>
            <p role="alert">Não foi possível ler os chamados deste navegador.</p>
            <button type="button" onClick={requestsSource.retry}>Tentar novamente</button>
          </div>
        ) : requests.length ? <RequestList requests={requests} nested /> : (
          <p role="status">Nenhum chamado registrado para este equipamento neste navegador.</p>
        )}
      </section>
      <section aria-labelledby="equipment-orders-title">
        <h2 id="equipment-orders-title">Ordens de serviço do equipamento</h2>
        {ordersSource.status === "loading" ? (
          <p role="status">Carregando ordens de serviço…</p>
        ) : ordersSource.status === "error" ? (
          <div>
            <p role="alert">Não foi possível carregar as ordens de serviço.</p>
            <button type="button" onClick={ordersSource.retry}>Tentar novamente</button>
          </div>
        ) : orders.length ? (
          <div className="work-orders-surface"><WorkOrderList orders={orders} /></div>
        ) : <p role="status">Nenhuma OS disponível para este equipamento.</p>}
      </section>
      <p className="equipment-intro">São exibidos os registros disponíveis na demonstração. Abra uma OS para consultar o histórico técnico e registrar atendimentos.</p>
    </div>
  );
}

export default function EquipmentDetailPage({ equipmentId }) {
  const { status, equipment, retry } = useEquipment();
  const item = equipment.find((entry) => entry.id === equipmentId);

  return (
    <div className="equipment-page equipment-detail-page">
      <a className="equipment-back" href="#/equipamentos">Voltar ao inventário</a>
      {status === "loading" ? (
        <>
          <h1>Ficha do equipamento</h1>
          <p role="status">Carregando equipamento…</p>
        </>
      ) : status === "error" ? (
        <>
          <h1>Ficha do equipamento</h1>
          <p role="alert">Não foi possível carregar o equipamento.</p>
          <button type="button" onClick={retry}>Tentar novamente</button>
        </>
      ) : !item ? (
        <>
          <h1>Equipamento não encontrado</h1>
          <p>Esta identificação não corresponde a um equipamento disponível no inventário.</p>
        </>
      ) : (
        <>
          <header className="equipment-heading">
            <div>
              <h1>{item.name}</h1>
              <p className="equipment-intro">Patrimônio {item.asset}</p>
            </div>
            <a className="button button-primary" href={`#/chamados/novo?equipamento=${encodeURIComponent(item.id)}`}>Abrir chamado</a>
          </header>
          <dl className="equipment-detail-facts">
            {[
              ["Patrimônio", item.asset],
              ["Número de série", item.serial],
              ["Marca", item.brand],
              ["Modelo", item.model],
              ["Setor atual", item.sector],
              ["Situação operacional", item.status],
            ].map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <EquipmentHistory equipmentId={equipmentId} />
        </>
      )}
    </div>
  );
}

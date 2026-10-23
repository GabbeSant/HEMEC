import React from "react";
import { useWorkOrders } from "../hooks/useWorkOrders";
import { formatDateOnly } from "../utils/formatDateOnly";
import "../components/work-orders/WorkOrders.css";

export default function WorkOrderPage({ orderId }) {
  const { status, data: order, retry } = useWorkOrders(orderId);
  const equipment = order?.equipment;

  return (
    <div className="work-order-page">
      <a className="work-order-back" href="#/dashboard">
        Voltar à dashboard
      </a>
      {status === "loading" ? (
        <p role="status">Carregando ordem de serviço…</p>
      ) : status === "error" ? (
        <div>
          <h1>Consulta da OS</h1>
          <p role="alert">Não foi possível carregar a ordem de serviço.</p>
          <button className="work-order-retry" type="button" onClick={retry}>
            Tentar novamente
          </button>
        </div>
      ) : !order ? (
        <div>
          <h1>OS não encontrada</h1>
          <p>
            Esta identificação não corresponde a uma ordem disponível. Volte à
            dashboard para consultar as OS.
          </p>
        </div>
      ) : (
        <>
          <header>
            <h1>{order.id}</h1>
            <p>Consulta da ordem de serviço.</p>
          </header>
          <section
            className="work-order-section"
            aria-labelledby="work-order-overview-title"
          >
            <h2 id="work-order-overview-title">Identificação da OS</h2>
            <dl className="work-order-details">
              <div>
                <dt>Situação</dt>
                <dd>{order.status}</dd>
              </div>
              <div>
                <dt>Prioridade</dt>
                <dd>
                  <span
                    className={`work-order-priority${order.priority === "Alta" ? " is-high" : ""}`}
                  >
                    {order.priority}
                  </span>
                </dd>
              </div>
              <div>
                <dt>Data da abertura</dt>
                <dd>
                  <time dateTime={order.openedAt}>
                    {formatDateOnly(order.openedAt)}
                  </time>
                </dd>
              </div>
              <div>
                <dt>Solicitante</dt>
                <dd>{order.openedBy}</dd>
              </div>
              <div>
                <dt>Setor da abertura</dt>
                <dd>{order.sector}</dd>
              </div>
              <div>
                <dt>Chamado de origem</dt>
                <dd>Não informado</dd>
              </div>
            </dl>
          </section>
          <section
            className="work-order-section"
            aria-labelledby="work-order-equipment-title"
          >
            <h2 id="work-order-equipment-title">Equipamento</h2>
            {equipment ? (
              <dl className="work-order-details">
                {[
                  ["Nome", equipment.name],
                  ["Patrimônio", equipment.asset],
                  ["Número de série", equipment.serial],
                  ["Marca", equipment.brand],
                  ["Modelo", equipment.model],
                  ["Setor atual", equipment.sector],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p>Equipamento não localizado no inventário atual.</p>
            )}
          </section>
          <section
            className="work-order-section"
            aria-labelledby="work-order-problem-title"
          >
            <h2 id="work-order-problem-title">Problema relatado</h2>
            <p>{order.description}</p>
          </section>
        </>
      )}
    </div>
  );
}

import React from "react";
import { useWorkOrders } from "../hooks/useWorkOrders";
import { filterWorkOrders } from "../utils/filterWorkOrders";
import WorkOrderList from "../components/work-orders/WorkOrderList";

export default function WorkOrdersPage({ filters }) {
  const { status, data, retry } = useWorkOrders();
  const orders = filterWorkOrders(data ?? [], filters);
  const hasFilters = filters.status || filters.priority || filters.pending;
  return (
    <div className="work-order-page">
      <a className="work-order-back" href="#/dashboard">
        Voltar à dashboard
      </a>
      <header>
        <h1>Ordens de serviço</h1>
        <p>
          Consulte a situação, a prioridade e o problema relatado em cada OS.
        </p>
      </header>
      {hasFilters && (
        <div className="work-orders-filters">
          <span>
            {[
              filters.status && `Situação: ${filters.status}`,
              filters.priority && `Prioridade: ${filters.priority}`,
              filters.pending && "Não concluídas",
            ]
              .filter(Boolean)
              .join(" / ")}
          </span>
          <a href="#/ordens-servico">Limpar filtros</a>
        </div>
      )}
      {status === "loading" ? (
        <p role="status">Carregando ordens de serviço…</p>
      ) : status === "error" ? (
        <div>
          <p role="alert">Não foi possível carregar as ordens de serviço.</p>
          <button className="work-order-retry" type="button" onClick={retry}>
            Tentar novamente
          </button>
        </div>
      ) : orders.length === 0 ? (
        <p role="status">
          {data.length
            ? "Nenhuma OS encontrada para estes filtros."
            : "Nenhuma ordem de serviço disponível."}
        </p>
      ) : (
        <>
          <p role="status">
            {orders.length} de {data.length} ordens de serviço
          </p>
          <div className="work-orders-surface">
            <WorkOrderList orders={orders} />
          </div>
        </>
      )}
    </div>
  );
}

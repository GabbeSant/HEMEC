import React from "react";
import WorkOrderList from "../work-orders/WorkOrderList";
import { filterWorkOrders } from "../../utils/filterWorkOrders";

export default function PriorityWorkOrders({ source }) {
  const { status, data, retry } = source;
  const pendingOrders = filterWorkOrders(data ?? [], {
    priority: "Alta",
    pending: true,
  });
  const orders = pendingOrders.slice(0, 3);
  return (
    <section
      className="dashboard-attention"
      aria-labelledby="dashboard-attention-title"
    >
      <header className="dashboard-section-heading">
        <div>
          <div className="dashboard-attention-title">
            <h2 id="dashboard-attention-title">Requer atenção</h2>
            {status === "success" && pendingOrders.length > 0 && (
              <span className="dashboard-attention-count">
                {pendingOrders.length.toLocaleString("pt-BR")} OS
              </span>
            )}
          </div>
          <p>Prioridade alta, sem conclusão registrada.</p>
        </div>
        <a href="#/ordens-servico?prioridade=Alta&pendentes=1">Ver todas</a>
      </header>
      {status === "loading" ? (
        <p className="work-order-feedback" role="status">
          Carregando ordens de serviço…
        </p>
      ) : status === "error" ? (
        <div className="work-order-feedback">
          <p role="alert">Não foi possível carregar as ordens de serviço.</p>
          <button className="work-order-retry" type="button" onClick={retry}>
            Tentar novamente
          </button>
        </div>
      ) : orders.length === 0 ? (
        <p className="work-order-feedback" role="status">
          Nenhuma OS de prioridade alta pendente nos registros disponíveis.
        </p>
      ) : (
        <WorkOrderList orders={orders} />
      )}
    </section>
  );
}

import React from "react";
import { formatDateOnly } from "../../utils/formatDateOnly";
import "./WorkOrders.css";

export default function WorkOrderList({ orders }) {
  return (
    <ul className="priority-orders">
      {orders.map((order) => (
        <li className="priority-order" key={order.id}>
          <div className="priority-order-description">
            <div className="work-order-reference">
              <a
                href={`#/os/${encodeURIComponent(order.id)}`}
                aria-label={`Consultar ${order.id}`}
              >
                {order.id}
              </a>
              <span>
                Aberta em{" "}
                <time dateTime={order.openedAt}>
                  {formatDateOnly(order.openedAt)}
                </time>
              </span>
            </div>
            <h3>{order.equipment?.name ?? "Equipamento não localizado"}</h3>
            <p>{order.description}</p>
          </div>
          <dl className="priority-order-facts">
            <div>
              <dt>Setor da abertura</dt>
              <dd>{order.sector}</dd>
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
              <dt>Situação</dt>
              <dd>
                <span
                  className={`work-order-status${order.status === "Em atendimento" ? " is-active" : ""}`}
                >
                  {order.status}
                </span>
              </dd>
            </div>
          </dl>
        </li>
      ))}
    </ul>
  );
}

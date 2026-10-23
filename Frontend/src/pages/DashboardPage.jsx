import React, { useState } from "react";
import DashboardIndicators from "../components/dashboard/DashboardIndicators";
import PriorityWorkOrders from "../components/dashboard/PriorityWorkOrders";
import RecentActivity from "../components/dashboard/RecentActivity";
import { useRequests } from "../hooks/useRequests";
import { useWorkOrders } from "../hooks/useWorkOrders";
import { useEquipment } from "../hooks/useEquipment";
import "./DashboardPage.css";

export default function DashboardPage() {
  const [query, setQuery] = useState("");
  const requestsSource = useRequests();
  const ordersSource = useWorkOrders();
  const equipmentSource = useEquipment();
  const refreshing = [requestsSource, ordersSource, equipmentSource].some((source) => source.status === "loading");

  function refresh() {
    requestsSource.retry();
    ordersSource.retry();
    equipmentSource.retry();
  }

  function searchEquipment(event) {
    event.preventDefault();
    const term = query.trim();
    window.location.hash = term
      ? `#/equipamentos?busca=${encodeURIComponent(term)}`
      : "#/equipamentos";
  }

  return (
    <div className="dashboard-page">
      <header className="dashboard-heading">
        <div>
          <h1>Dashboard</h1>
          <p>Acompanhe as pendências de manutenção e acesse os equipamentos.</p>
        </div>
        <div className="dashboard-toolbar">
          <button className="dashboard-refresh" type="button" onClick={refresh} disabled={refreshing}>{refreshing ? "Atualizando…" : "Atualizar dados"}</button>
          <div className="dashboard-primary-action"><a href="#/chamados/novo">
            <span aria-hidden="true">+</span> Novo chamado
          </a></div>
        </div>
      </header>

      <form
        className="dashboard-search"
        role="search"
        aria-label="Buscar equipamentos"
        onSubmit={searchEquipment}
      >
        <label id="dashboard-search-label" htmlFor="dashboard-equipment-search">
          Buscar equipamento
        </label>
        <div className="dashboard-search-row">
          <input
            id="dashboard-equipment-search"
            type="search"
            placeholder="Patrimônio, nome, série ou setor"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button type="submit">Buscar</button>
          <a href="#/equipamentos">Ver todos</a>
        </div>
      </form>

      <DashboardIndicators requestsSource={requestsSource} ordersSource={ordersSource} equipmentSource={equipmentSource} />

      <PriorityWorkOrders source={ordersSource} />
      <RecentActivity source={requestsSource} />
    </div>
  );
}

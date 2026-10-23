import React, { useEffect, useState } from "react";
import AppLayout from "./components/layout/AppLayout";
import HomePage from "./pages/HomePage";
import EquipmentPage from "./pages/EquipmentPage";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import OperationalLayout from "./components/layout/OperationalLayout";
import WorkOrderPage from "./pages/WorkOrderPage";
import NewRequestPage from "./pages/NewRequestPage";
import RequestsPage from "./pages/RequestsPage";
import WorkOrdersPage from "./pages/WorkOrdersPage";

// A rota no hash permite atualizar a demonstração sem configuração de servidor.
export default function App() {
  const [hash, setHash] = useState(() => window.location.hash);
  const [session, setSession] = useState(null);
  const [createdRequestId, setCreatedRequestId] = useState(null);
  useEffect(() => {
    const navigate = () => {
      // O atalho de acessibilidade move o foco sem sair da página atual.
      if (window.location.hash !== "#conteudo") {
        setHash(window.location.hash);
        if (window.location.hash !== "#/chamados") setCreatedRequestId(null);
      }
    };
    window.addEventListener("hashchange", navigate);
    return () => window.removeEventListener("hashchange", navigate);
  }, []);
  const [route, search = ""] = hash.split("?");
  const inventory = route === "#/equipamentos";
  const inventoryQuery = new URLSearchParams(search).get("busca") ?? "";
  const statusParam = new URLSearchParams(search).get("situacao") ?? "";
  const inventoryStatus = ["Disponível", "Em manutenção", "Indisponível"].includes(statusParam) ? statusParam : "";
  const requestsStatus = statusParam === "Aberto" ? statusParam : "";
  const requestId = new URLSearchParams(search).get("id") ?? "";
  const orders = route === "#/ordens-servico";
  const orderFilters = {
    status: ["Aberta", "Em atendimento", "Concluída"].includes(statusParam) ? statusParam : "",
    priority: new URLSearchParams(search).get("prioridade") === "Alta" ? "Alta" : "",
    pending: new URLSearchParams(search).get("pendentes") === "1",
  };
  const login = hash === "#/login";
  const dashboard = hash === "#/dashboard";
  const newRequest = hash === "#/chamados/novo";
  const requests = route === "#/chamados";
  const orderId = hash.startsWith("#/os/") ? hash.slice(5) : null;
  useEffect(() => {
    document.title = newRequest
      ? "Novo chamado | HEMEC"
      : requests
      ? "Chamados | HEMEC"
      : orders
      ? "Ordens de serviço | HEMEC"
      : orderId !== null
      ? "Consulta de OS | HEMEC"
      : dashboard
      ? "Dashboard | HEMEC"
      : inventory
      ? "Equipamentos | HEMEC"
      : login
        ? "Entrar | HEMEC"
        : "HEMEC";
    if (inventory || login || dashboard || newRequest || requests || orders || orderId !== null) {
      window.scrollTo(0, 0);
      document.getElementById("conteudo")?.focus({ preventScroll: true });
    } else if (route) {
      document.getElementById(route.slice(1))?.scrollIntoView();
    }
  }, [inventory, login, dashboard, newRequest, requests, orders, orderId, route]);

  function updateEquipmentFilters(query, status) {
    const params = new URLSearchParams();
    if (query) params.set("busca", query);
    if (status) params.set("situacao", status);
    const suffix = params.toString();
    const nextHash = `#/equipamentos${suffix ? `?${suffix}` : ""}`;
    // Mantém os filtros no endereço sem remontar a página ou tirar o foco do campo.
    window.history.replaceState(window.history.state, "", nextHash);
    setHash(nextHash);
  }

  function logout() {
    setSession(null);
    window.location.hash = "#/login";
  }

  if (dashboard || inventory || newRequest || requests || orders || orderId !== null) {
    return (
      <OperationalLayout session={session} onLogout={logout} activePage={dashboard ? "dashboard" : inventory ? "equipment" : newRequest || requests ? "requests" : "orders"}>
        {dashboard ? <DashboardPage /> : inventory ? (
          <EquipmentPage query={inventoryQuery} status={inventoryStatus} onFiltersChange={updateEquipmentFilters} />
        ) : newRequest ? (
          <NewRequestPage session={session} onCreated={(id) => {
            setCreatedRequestId(id);
            window.location.hash = "#/chamados";
          }} />
        ) : requests ? <RequestsPage createdId={createdRequestId} statusFilter={requestsStatus} idFilter={requestId} /> : orders ? (
          <WorkOrdersPage filters={orderFilters} />
        ) : (
          <WorkOrderPage key={orderId} orderId={orderId} />
        )}
      </OperationalLayout>
    );
  }
  return (
    <AppLayout showFooter={!login}>
      {login ? (
        <AuthPage
          onLogin={(user) => {
            setSession(user);
            window.location.hash = "#/dashboard";
          }}
        />
      ) : (
        <HomePage />
      )}
    </AppLayout>
  );
}

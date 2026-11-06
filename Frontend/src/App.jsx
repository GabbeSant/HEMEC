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
import EquipmentDetailPage from "./pages/EquipmentDetailPage";
import RequestDetailPage from "./pages/RequestDetailPage";

function routeId(route, prefix) {
  if (!route.startsWith(prefix)) return null;
  try {
    return decodeURIComponent(route.slice(prefix.length));
  } catch {
    return "";
  }
}

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
  const login = route === "#/login";
  const dashboard = route === "#/dashboard";
  const newRequest = route === "#/chamados/novo";
  const initialEquipmentId = new URLSearchParams(search).get("equipamento") ?? "";
  const equipmentId = routeId(route, "#/equipamentos/");
  const requestDetailId = newRequest ? null : routeId(route, "#/chamados/");
  // O retorno do login aceita somente o fluxo local de abertura de chamado.
  const returnParam = new URLSearchParams(search).get("retorno") ?? "";
  const loginReturn = returnParam.split("?")[0] === "#/chamados/novo"
    ? returnParam : "#/dashboard";
  const requests = route === "#/chamados";
  const orderId = routeId(route, "#/os/");
  useEffect(() => {
    document.title = equipmentId !== null
      ? "Ficha do equipamento | HEMEC"
      : requestDetailId !== null
      ? "Detalhes do chamado | HEMEC"
      : newRequest
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
    if (inventory || equipmentId !== null || requestDetailId !== null || login || dashboard || newRequest || requests || orders || orderId !== null) {
      window.scrollTo(0, 0);
      document.getElementById("conteudo")?.focus({ preventScroll: true });
    } else if (route) {
      document.getElementById(route.slice(1))?.scrollIntoView();
    }
  }, [inventory, equipmentId, requestDetailId, login, dashboard, newRequest, requests, orders, orderId, route]);

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

  if (dashboard || inventory || equipmentId !== null || requestDetailId !== null || newRequest || requests || orders || orderId !== null) {
    return (
      <OperationalLayout
        session={session}
        onLogout={logout}
        loginHref={newRequest ? `#/login?retorno=${encodeURIComponent(hash)}` : "#/login"}
        activePage={dashboard ? "dashboard" : inventory || equipmentId !== null ? "equipment" : newRequest || requests || requestDetailId !== null ? "requests" : "orders"}
      >
        {dashboard ? <DashboardPage /> : equipmentId !== null ? (
          <EquipmentDetailPage key={equipmentId} equipmentId={equipmentId} />
        ) : requestDetailId !== null ? (
          <RequestDetailPage key={requestDetailId} requestId={requestDetailId} />
        ) : inventory ? (
          <EquipmentPage query={inventoryQuery} status={inventoryStatus} onFiltersChange={updateEquipmentFilters} />
        ) : newRequest ? (
          <NewRequestPage key={initialEquipmentId} initialEquipmentId={initialEquipmentId} session={session} onCreated={(id) => {
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
            window.location.hash = loginReturn;
          }}
        />
      ) : (
        <HomePage />
      )}
    </AppLayout>
  );
}

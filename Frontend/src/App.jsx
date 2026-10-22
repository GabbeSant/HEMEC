import React, { useEffect, useState } from "react";
import AppLayout from "./components/layout/AppLayout";
import HomePage from "./pages/HomePage";
import EquipmentPage from "./pages/EquipmentPage";
import AuthPage from "./pages/AuthPage";

// A rota no hash permite atualizar a demonstração sem configuração de servidor.
export default function App() {
  const [hash, setHash] = useState(() => window.location.hash);
  const [session, setSession] = useState(null);
  useEffect(() => {
    const navigate = () => {
      // O atalho de acessibilidade move o foco sem sair da página atual.
      if (window.location.hash !== "#conteudo") setHash(window.location.hash);
    };
    window.addEventListener("hashchange", navigate);
    return () => window.removeEventListener("hashchange", navigate);
  }, []);
  const inventory = hash === "#/equipamentos";
  const login = hash === "#/login";
  useEffect(() => {
    document.title = inventory
      ? "Equipamentos | HEMEC"
      : login
        ? "Entrar | HEMEC"
        : "HEMEC";
    if (inventory || login) {
      window.scrollTo(0, 0);
      document.getElementById("conteudo")?.focus({ preventScroll: true });
    } else if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
    }
  }, [inventory, login, hash]);
  return (
    <AppLayout showFooter={!login}>
      {inventory ? (
        <EquipmentPage
          session={session}
          onLogout={() => {
            setSession(null);
            window.location.hash = "#/login";
          }}
        />
      ) : login ? (
        <AuthPage
          onLogin={(user) => {
            setSession(user);
            window.location.hash = "#/equipamentos";
          }}
        />
      ) : (
        <HomePage />
      )}
    </AppLayout>
  );
}

import React, { useEffect, useState } from "react";
import AppLayout from "./components/layout/AppLayout";
import HomePage from "./pages/HomePage";
import EquipmentPage from "./pages/EquipmentPage";
import AuthPage from "./pages/AuthPage";

// A rota no hash permite atualizar a demonstração sem configuração de servidor.
export default function App() {
  const [hash, setHash] = useState(() => window.location.hash);
  const [session, setSession] = useState(null);
  const [registered, setRegistered] = useState(false);
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
  const register = hash === "#/cadastro";
  useEffect(() => {
    document.title = inventory
      ? "Equipamentos | HEMEC"
      : register
        ? "Criar conta | HEMEC"
        : login
          ? "Entrar | HEMEC"
          : "HEMEC";
    if (inventory || login || register) {
      window.scrollTo(0, 0);
      document.getElementById("conteudo")?.focus({ preventScroll: true });
    } else if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
    }
  }, [inventory, login, register, hash]);
  return (
    <AppLayout showFooter={!login && !register}>
      {inventory ? (
        <EquipmentPage
          session={session}
          onLogout={() => {
            setSession(null);
            setRegistered(false);
            window.location.hash = "#/login";
          }}
        />
      ) : login || register ? (
        <AuthPage
          key={register ? "register" : "login"}
          register={register}
          registered={registered}
          onRegister={() => {
            setRegistered(true);
            window.location.hash = "#/login";
          }}
          onLogin={(user) => {
            setSession(user);
            setRegistered(false);
            window.location.hash = "#/equipamentos";
          }}
        />
      ) : (
        <HomePage />
      )}
    </AppLayout>
  );
}

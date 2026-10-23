import React, { useRef, useState } from "react";
import "./OperationalLayout.css";

export default function OperationalLayout({
  children,
  session,
  onLogout,
  activePage = "dashboard",
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef(null);

  function closeMenu(event) {
    const link = event.target.closest("a");
    if (link) {
      setMenuOpen(false);
      if (link.hash === window.location.hash) menuButton.current?.focus();
    }
  }

  return (
    <div className="operational-shell">
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <aside className="operational-sidebar" aria-label="Menu do sistema">
        <div className="operational-sidebar-heading">
          <a className="brand" href="#/dashboard" aria-label="HEMEC, dashboard">
            HEMEC
          </a>
          <button
            ref={menuButton}
            type="button"
            className="operational-menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="operational-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            Menu
          </button>
        </div>
        <p className="operational-caption">
          Manutenção de equipamentos hospitalares
        </p>
        <nav
          id="operational-navigation"
          className={`operational-nav${menuOpen ? " is-open" : ""}`}
          aria-label="Navegação operacional"
          onClick={closeMenu}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setMenuOpen(false);
              menuButton.current?.focus();
            }
          }}
        >
          <a
            href="#/dashboard"
            aria-current={activePage === "dashboard" ? "page" : undefined}
          >
            Dashboard
          </a>
          <a
            href="#/equipamentos"
            aria-current={activePage === "equipment" ? "page" : undefined}
          >
            Equipamentos
          </a>
          <a
            href="#/chamados"
            aria-current={activePage === "requests" ? "page" : undefined}
          >
            Chamados
          </a>
          <a
            href="#/ordens-servico"
            aria-current={activePage === "orders" ? "page" : undefined}
          >
            Ordens de serviço
          </a>
        </nav>
        <div className="operational-sidebar-footer">
          <a href="#inicio">Página inicial</a>
          <span>HEMEC</span>
        </div>
      </aside>
      <div className="operational-workspace">
        <header className="operational-topbar">
          {session ? (
            <div className="operational-account">
              <span>{session.name}</span>
              <button type="button" onClick={onLogout}>
                Sair
              </button>
            </div>
          ) : (
            <a href="#/login">Entrar</a>
          )}
        </header>
        <main id="conteudo" className="operational-main" tabIndex={-1}>
          {children}
        </main>
      </div>
    </div>
  );
}

import React from "react";

export default function AppLayout({ children }) {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <header className="app-header">
        <a className="brand" href="#inicio" aria-label="HEMEC, início">HEMEC<span>.</span></a>
        <span className="header-caption">Controle de manutenção<br />de equipamentos hospitalares</span>
        <nav className="main-nav" aria-label="Navegação principal">
          <a href="#inicio">Início</a>
          <a href="#funcionalidades">Funcionalidades</a>
          <a className="nav-access" href="#acesso">Acessar o sistema</a>
        </nav>
      </header>
      <main id="conteudo" tabIndex={-1}>{children}</main>
      <footer className="app-footer">
        <span>HEMEC · Projeto acadêmico</span>
        <span>Demonstração sem conexão com o hospital.</span>
      </footer>
    </div>
  );
}

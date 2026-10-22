import React from "react";
import HeroCarousel from "../components/home/HeroCarousel";

// Página pública de apresentação. Os links apontam para seções existentes.
export default function HomePage() {
  return (
    <>
      <section id="inicio" className="hero" aria-labelledby="page-title">
        <div className="hero-copy">
          <h1 id="page-title">Cada equipamento tem uma história de cuidado.</h1>
          <p className="hero-description">
            O HEMEC reúne o cadastro dos equipamentos hospitalares, os chamados
            e os registros de manutenção. Acompanhe o que precisa de atenção e o
            trabalho realizado em cada atendimento.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#/login">
              Entrar no sistema
            </a>
            <a className="button button-secondary" href="#funcionalidades">
              Como funciona
            </a>
          </div>
          <p className="demo-note">
            Desenvolvido para apoiar a organização da manutenção hospitalar.
          </p>
        </div>
        <HeroCarousel />
      </section>
      <section
        id="funcionalidades"
        className="features"
        aria-labelledby="features-title"
      >
        <div className="section-heading">
          <h2 id="features-title">Um registro que acompanha o trabalho.</h2>
          <p>
            Do patrimônio ao serviço executado, cada etapa mantém o equipamento
            como ponto de referência.
          </p>
        </div>
        <div className="feature-grid">
          <article className="feature">
            <h3>Equipamentos</h3>
            <p>
              Patrimônio, série, marca, modelo e setor. Uma ficha para consultar
              a situação e os atendimentos vinculados.
            </p>
          </article>
          <article className="feature">
            <h3>Chamados</h3>
            <p>
              O registro da necessidade: equipamento, solicitante, problema
              relatado e prioridade do atendimento.
            </p>
          </article>
          <article className="feature">
            <h3>Ordens de serviço</h3>
            <p>
              A organização da execução: responsável, serviços realizados, horas
              técnicas e histórico de cada intervenção.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}

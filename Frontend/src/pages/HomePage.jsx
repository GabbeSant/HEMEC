import React from "react";
import HeroCarousel from "../components/home/HeroCarousel";

// Página pública de apresentação. Os links apontam para seções existentes.
export default function HomePage() {
  return (
    <>
      <section id="inicio" className="hero" aria-labelledby="page-title">
        <div className="hero-copy">
          <p className="section-label">
            Gestão de equipamentos médico-hospitalares
          </p>
          <h1 id="page-title">
            Cuidar dos
            <br />
            equipamentos.
            <br />
            <span>Apoiar o cuidado.</span>
          </h1>
          <p className="hero-description">
            Do cadastro ao histórico de manutenção: organize equipamentos,
            comunique falhas e acompanhe cada atendimento em um só lugar.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#acesso">
              Acessar o sistema
            </a>
            <a className="button button-secondary" href="#funcionalidades">
              Conhecer funcionalidades
            </a>
          </div>
          <p className="demo-note">Projeto acadêmico em desenvolvimento.</p>
        </div>
        <HeroCarousel />
      </section>
      <section
        id="funcionalidades"
        className="features"
        aria-labelledby="features-title"
      >
        <div className="section-heading">
          <h2 id="features-title">
            Da identificação
            <br />
            ao histórico.
          </h2>
          <p>
            Um fluxo para localizar o equipamento, registrar a necessidade e
            acompanhar o trabalho técnico.
          </p>
        </div>
        <div className="feature-grid">
          <article className="feature">
            <span className="feature-number" aria-hidden="true">
              01
            </span>
            <h3>Equipamentos</h3>
            <p>
              Patrimônio, série, marca, modelo e setor. Uma ficha para consultar
              a situação e os atendimentos vinculados.
            </p>
          </article>
          <article className="feature">
            <span className="feature-number" aria-hidden="true">
              02
            </span>
            <h3>Chamados</h3>
            <p>
              O registro da necessidade: equipamento, solicitante, problema
              relatado e prioridade do atendimento.
            </p>
          </article>
          <article className="feature">
            <span className="feature-number" aria-hidden="true">
              03
            </span>
            <h3>Ordens de serviço</h3>
            <p>
              A organização da execução: responsável, serviços realizados, horas
              técnicas e histórico de cada intervenção.
            </p>
          </article>
        </div>
      </section>
      <section
        id="acesso"
        className="access-section"
        aria-labelledby="access-title"
      >
        <div>
          <p className="section-label">Sobre esta versão</p>
          <h2 id="access-title">O sistema está em construção.</h2>
        </div>
        <div className="access-description">
          <p>
            Esta página apresenta a proposta do HEMEC. O acesso ao sistema e as
            funcionalidades descritas serão disponibilizados nas próximas
            etapas.
          </p>
          <p className="access-note">
            Sem autenticação, armazenamento de registros ou sincronização com a
            equipe nesta versão.
          </p>
        </div>
      </section>
    </>
  );
}

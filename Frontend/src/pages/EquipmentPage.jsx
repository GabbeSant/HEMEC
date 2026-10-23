import React, { useEffect, useState } from "react";
import { equipmentService } from "../services/equipmentService";
import { filterEquipment } from "../utils/filterEquipment";
import "./EquipmentPage.css";

export default function EquipmentPage({
  query = "",
  status = "",
  onFiltersChange,
}) {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    equipmentService
      .list()
      .then((data) => {
        if (!cancelled) setEquipment(data);
      })
      .catch(() => {
        if (!cancelled)
          setError(
            "Não foi possível carregar os equipamentos. Tente novamente.",
          );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [attempt]);

  const filtered = filterEquipment(equipment, { query, status });

  function updateFilters(nextQuery, nextStatus) {
    onFiltersChange(nextQuery, nextStatus);
  }

  return (
    <section className="equipment-page" aria-labelledby="equipment-title">
      <a className="equipment-back" href="#/dashboard">
        Voltar à dashboard
      </a>
      <header className="equipment-heading">
        <div>
          <h1 id="equipment-title">Equipamentos</h1>
          <p className="equipment-intro">
            Consulte o patrimônio, a localização e a situação operacional.
          </p>
        </div>
        <a className="button button-primary" href="#/chamados/novo">
          Novo chamado
        </a>
      </header>
      <div
        className="equipment-filters"
        role="search"
        aria-label="Buscar equipamentos"
      >
        <label htmlFor="equipment-search">
          Buscar equipamento
          <input
            id="equipment-search"
            type="search"
            value={query}
            onChange={(event) => updateFilters(event.target.value, status)}
            placeholder="Patrimônio, nome, série, marca, modelo ou setor"
          />
        </label>
        <label htmlFor="equipment-status">
          Situação operacional
          <select
            id="equipment-status"
            value={status}
            onChange={(event) => updateFilters(query, event.target.value)}
          >
            <option value="">Todas as situações</option>
            <option>Disponível</option>
            <option>Em manutenção</option>
            <option>Indisponível</option>
          </select>
        </label>
      </div>
      {loading ? (
        <p role="status">Carregando equipamentos…</p>
      ) : error ? (
        <div role="alert">
          <p>{error}</p>
          <button
            type="button"
            onClick={() => setAttempt((current) => current + 1)}
          >
            Tentar novamente
          </button>
        </div>
      ) : (
        <>
          <p className="equipment-count" role="status">
            {filtered.length} de {equipment.length} equipamentos
          </p>
          {filtered.length ? (
            <ul className="equipment-list">
              {filtered.map((item) => (
                <li key={item.id} className="equipment-item">
                  <div className="equipment-identity">
                    <span>{item.asset}</span>
                    <h2>{item.name}</h2>
                    <p>
                      {item.brand} / {item.model}
                    </p>
                  </div>
                  <dl>
                    <div>
                      <dt>Número de série</dt>
                      <dd>{item.serial}</dd>
                    </div>
                    <div>
                      <dt>Setor</dt>
                      <dd>{item.sector}</dd>
                    </div>
                    <div>
                      <dt>Situação</dt>
                      <dd>{item.status}</dd>
                    </div>
                  </dl>
                </li>
              ))}
            </ul>
          ) : (
            <div className="equipment-empty">
              <h2>
                {equipment.length
                  ? "Nenhum equipamento encontrado"
                  : "Nenhum equipamento cadastrado"}
              </h2>
              <p>
                {equipment.length
                  ? "Revise a busca ou limpe os filtros para consultar a lista completa."
                  : "Os equipamentos aparecerão aqui quando estiverem disponíveis."}
              </p>
              {equipment.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    updateFilters("", "");
                  }}
                >
                  Limpar filtros
                </button>
              )}
            </div>
          )}
        </>
      )}
    </section>
  );
}

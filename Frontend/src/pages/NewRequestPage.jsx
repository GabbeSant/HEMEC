import React, { useEffect, useRef, useState } from "react";
import { useEquipment } from "../hooks/useEquipment";
import { requestService } from "../services/requestService";
import { filterEquipment } from "../utils/filterEquipment";
import "./RequestsPage.css";

export default function NewRequestPage({ session, onCreated, initialEquipmentId = "" }) {
  const { equipment, status, retry } = useEquipment();
  const [query, setQuery] = useState("");
  const [equipmentId, setEquipmentId] = useState(initialEquipmentId);
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const saveError = useRef(null);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (error) saveError.current?.focus();
  }, [error]);

  async function submit(event) {
    event.preventDefault();
    if (saving) return;
    setError("");
    setDescriptionError("");
    if (!description.trim()) {
      setDescriptionError("Descreva o problema relatado.");
      document.getElementById("request-description")?.focus();
      return;
    }
    setSaving(true);
    try {
      const request = await requestService.create({
        equipmentId,
        description,
        requester: session,
      });
      if (mounted.current) onCreated(request.id);
    } catch {
      if (mounted.current)
        setError(
          "Não foi possível salvar o chamado. Confira o equipamento e permita o armazenamento neste navegador antes de tentar novamente.",
        );
    } finally {
      if (mounted.current) setSaving(false);
    }
  }

  const selected = equipment.find((item) => item.id === equipmentId);
  const filtered = filterEquipment(equipment, { query });
  // A seleção continua identificada mesmo quando o usuário refina a busca.
  const visible = filtered.slice(0, 8);
  const options = selected && !visible.some((item) => item.id === selected.id)
    ? [selected, ...visible] : visible;
  const returnRoute = `#/chamados/novo${initialEquipmentId ? `?equipamento=${encodeURIComponent(initialEquipmentId)}` : ""}`;

  return (
    <div className="requests-page">
      <a href="#/dashboard">Voltar à dashboard</a>
      <header>
        <h1>Novo chamado</h1>
        <p>Identifique o equipamento e descreva o problema observado.</p>
      </header>
      <p className="request-local-note">
        Demonstração local: o chamado fica salvo apenas neste navegador, sem envio ao hospital.
        Use dados fictícios. O login e o solicitante são demonstrativos.
      </p>
      {!session ? (
        <p>
          Entre no sistema para registrar o chamado.{" "}
          <a href={`#/login?retorno=${encodeURIComponent(returnRoute)}`}>Entrar</a>
        </p>
      ) : (
        <form className="request-form" onSubmit={submit} aria-busy={saving}>
          <p>Solicitante: {session.email}</p>
          {status === "loading" ? (
            <p role="status">Carregando equipamentos…</p>
          ) : status === "error" ? (
            <div>
              <p role="alert">Não foi possível carregar os equipamentos.</p>
              <button
                type="button"
                onClick={retry}
              >
                Tentar novamente
              </button>
            </div>
          ) : equipment.length === 0 ? (
            <p role="status">Nenhum equipamento cadastrado.</p>
          ) : (
            <>
              <label htmlFor="request-equipment-query">
                Localizar equipamento
              </label>
              <input
                id="request-equipment-query"
                type="search"
                placeholder="Patrimônio, nome, série ou setor"
                value={query}
                disabled={saving}
                aria-describedby="request-search-help"
                onChange={(event) => setQuery(event.target.value)}
              />
              <p id="request-search-help" className="request-selection" role="status">
                {filtered.length > 8
                  ? `${filtered.length} resultados. Exibindo os primeiros 8; refine a busca por patrimônio ou série.`
                  : `${filtered.length} equipamentos encontrados.`}
              </p>
              {initialEquipmentId && !equipment.some((item) => item.id === initialEquipmentId) && (
                <p role="status">O equipamento indicado no link não foi encontrado. Selecione outro equipamento.</p>
              )}
              <label htmlFor="request-equipment">Equipamento</label>
              <select
                id="request-equipment"
                aria-describedby={
                  selected ? "request-equipment-selection" : undefined
                }
                required
                value={selected ? equipmentId : ""}
                onChange={(event) => setEquipmentId(event.target.value)}
                disabled={saving}
              >
                <option value="">Selecione o equipamento</option>
                {options.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.asset} — {item.name} ({item.sector})
                  </option>
                ))}
              </select>
              {filtered.length === 0 && (
                <p role="status">Nenhum equipamento encontrado na busca.</p>
              )}
              {selected && (
                <p
                  id="request-equipment-selection"
                  className="request-selection"
                >
                  {selected.asset}: {selected.name}. Série {selected.serial}.
                  Setor: {selected.sector}.
                </p>
              )}
            </>
          )}
          <label htmlFor="request-description">Problema relatado</label>
          <textarea
            id="request-description"
            required
            rows={5}
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
              setDescriptionError("");
            }}
            aria-invalid={descriptionError ? "true" : undefined}
            aria-describedby={
              descriptionError ? "request-description-error" : undefined
            }
            disabled={saving}
          />
          {descriptionError && (
            <p
              className="request-error"
              id="request-description-error"
              role="alert"
            >
              {descriptionError}
            </p>
          )}
          {error && (
            <p
              ref={saveError}
              className="request-error"
              role="alert"
              tabIndex={-1}
            >
              {error}
            </p>
          )}
          <p className="request-save-status" role="status">
            {saving ? "Registrando chamado…" : ""}
          </p>
          <div className="request-actions">
            <button
              type="submit"
              disabled={saving || status !== "success" || equipment.length === 0}
            >
              {saving ? "Salvando chamado…" : "Registrar chamado"}
            </button>
            {!saving && <a href={selected ? `#/equipamentos/${encodeURIComponent(selected.id)}` : "#/chamados"}>Cancelar</a>}
          </div>
        </form>
      )}
    </div>
  );
}

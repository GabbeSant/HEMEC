import React, { useEffect, useRef, useState } from "react";
import { attendanceService } from "../../services/attendanceService";

function localDateTime() {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
}

export default function AttendanceForm({ orderId, defaultSector, onSaved, onChange }) {
  const [classification, setClassification] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const errorRef = useRef(null);
  const mounted = useRef(true);
  const submitting = useRef(false);

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);

  useEffect(() => {
    if (error) errorRef.current?.focus();
  }, [error]);

  async function submit(event) {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    const values = new FormData(form);
    const technician = String(values.get("technician") ?? "");
    const sector = String(values.get("sector") ?? "");
    const description = String(values.get("description") ?? "");
    const company = String(values.get("company") ?? "");
    setError("");
    if ([technician, sector, description].some((value) => !value.trim()) ||
        (classification === "COE" && !company.trim())) {
      setError("Preencha os campos obrigatórios com texto; em COE, informe também a empresa responsável.");
      return;
    }
    const hours = Number(values.get("hours"));
    const minutes = Number(values.get("minutes"));
    if (hours * 60 + minutes <= 0) {
      setError("Informe um tempo trabalhado maior que zero.");
      return;
    }
    submitting.current = true;
    setSaving(true);
    try {
      await attendanceService.create({
        orderId, technician, sector, description, company,
        performedAt: String(values.get("performedAt")),
        hours, minutes, classification,
      });
      if (mounted.current) {
        form.reset();
        setClassification("");
        onSaved();
      }
    } catch {
      if (mounted.current) setError("Não foi possível salvar o atendimento. Confira os dados e o armazenamento deste navegador. Os campos foram preservados.");
    } finally {
      submitting.current = false;
      if (mounted.current) setSaving(false);
    }
  }

  return (
    <form className="attendance-form" onSubmit={submit} onChange={onChange} aria-busy={saving}>
      <p className="attendance-note">
        Demonstração local: use dados fictícios. O atendimento fica neste navegador;
        seu registro não encerra a OS nem libera o equipamento.
      </p>
      <fieldset disabled={saving}>
        <legend>Dados do atendimento</legend>
        <div className="attendance-fields">
          <label htmlFor="attendance-technician">Técnico responsável
            <input id="attendance-technician" name="technician" required />
          </label>
          <label htmlFor="attendance-date">Data e hora do atendimento
            <input id="attendance-date" name="performedAt" type="datetime-local" defaultValue={localDateTime()} required />
          </label>
          <label htmlFor="attendance-sector">Setor do atendimento
            <input id="attendance-sector" name="sector" defaultValue={defaultSector} required />
          </label>
          <label htmlFor="attendance-classification">Classificação
            <select id="attendance-classification" name="classification" required value={classification} onChange={(event) => setClassification(event.target.value)}>
              <option value="">Selecione COI ou COE</option>
              <option value="COI">COI — Manutenção interna</option>
              <option value="COE">COE — Manutenção externa</option>
            </select>
          </label>
          {classification === "COE" && (
            <label className="attendance-full-width" htmlFor="attendance-company">Empresa responsável
              <input id="attendance-company" name="company" required />
            </label>
          )}
          <label htmlFor="attendance-hours">Horas trabalhadas
            <input id="attendance-hours" name="hours" type="number" min="0" step="1" defaultValue="0" required />
          </label>
          <label htmlFor="attendance-minutes">Minutos trabalhados
            <input id="attendance-minutes" name="minutes" type="number" min="0" max="59" step="1" defaultValue="0" required />
          </label>
          <label className="attendance-full-width" htmlFor="attendance-description">Serviço executado
            <textarea id="attendance-description" name="description" rows={4} required />
          </label>
        </div>
      </fieldset>
      {error && <p className="attendance-error" role="alert" tabIndex={-1} ref={errorRef}>{error}</p>}
      <p role="status">{saving ? "Registrando atendimento…" : ""}</p>
      <button className="attendance-submit" type="submit" disabled={saving}>
        {saving ? "Salvando atendimento…" : "Salvar atendimento"}
      </button>
    </form>
  );
}

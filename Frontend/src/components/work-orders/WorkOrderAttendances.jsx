import React, { useState } from "react";
import { useAttendances } from "../../hooks/useAttendances";
import { formatDateTime } from "../../utils/formatDateTime";
import { formatWorkedTime } from "../../utils/formatWorkedTime";
import AttendanceForm from "./AttendanceForm";

export default function WorkOrderAttendances({ order }) {
  const { status, attendances, retry } = useAttendances(order.id);
  const [saved, setSaved] = useState(false);
  const total = attendances.reduce((minutes, item) => minutes + item.workedMinutes, 0);

  return (
    <>
      <section className="work-order-section" aria-labelledby="attendance-history-title">
        <h2 id="attendance-history-title">Histórico técnico</h2>
        {status === "loading" ? (
          <p role="status">Carregando atendimentos…</p>
        ) : status === "error" ? (
          <div>
            <p role="alert">Não foi possível ler os atendimentos deste navegador. Os registros não foram substituídos.</p>
            <button className="work-order-retry" type="button" onClick={retry}>Tentar novamente</button>
          </div>
        ) : (
          <>
            <p className="attendance-total">Tempo técnico total: <strong>{formatWorkedTime(total)}</strong></p>
            <p className="attendance-note">Soma dos períodos trabalhados nos registros locais, independente da duração cronológica da OS.</p>
            {attendances.length === 0 ? (
              <p role="status">Nenhum atendimento registrado para esta OS neste navegador.</p>
            ) : (
              <ol className="attendance-list">
                {[...attendances].sort((a, b) => Date.parse(b.performedAt) - Date.parse(a.performedAt)).map((item) => (
                  <li key={item.id}>
                    <h3>{item.technician}</h3>
                    <dl className="work-order-details">
                      <div><dt>Data do atendimento</dt><dd><time dateTime={item.performedAt}>{formatDateTime(item.performedAt)}</time></dd></div>
                      <div><dt>Setor do atendimento</dt><dd>{item.sector}</dd></div>
                      <div><dt>Tempo trabalhado</dt><dd>{formatWorkedTime(item.workedMinutes)}</dd></div>
                      <div><dt>Classificação</dt><dd>{item.classification} — {item.classification === "COI" ? "Manutenção interna" : "Manutenção externa"}</dd></div>
                      {item.classification === "COE" && <div><dt>Empresa responsável</dt><dd>{item.company}</dd></div>}
                    </dl>
                    <p className="attendance-description">{item.description}</p>
                  </li>
                ))}
              </ol>
            )}
          </>
        )}
      </section>
      <section className="work-order-section" aria-labelledby="attendance-form-title">
        <h2 id="attendance-form-title">Registrar atendimento</h2>
        {saved && <p className="attendance-success" role="status">Atendimento registrado com sucesso neste navegador.</p>}
        <AttendanceForm
          orderId={order.id}
          defaultSector={order.sector}
          onChange={() => setSaved(false)}
          onSaved={() => { setSaved(true); retry(); }}
        />
      </section>
    </>
  );
}

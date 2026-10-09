import React, { useState } from "react";
import { ArrowLeft, ArrowUpRight, Plus, Clock, Save } from "lucide-react";

export function OrderFacts({ equipment, order }) {
  return (
    <dl className="order-facts">
      {[
        ["Nº de série", equipment.serial],
        ["Marca", equipment.brand],
        ["Modelo", equipment.model],
        ["Setor", order.sector || equipment.sector],
        ["Aberto por", order.openedBy],
      ].map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value || "Não informado"}</dd>
        </div>
      ))}
    </dl>
  );
}
export function OrdersList({ orders, equipments, onOpen, Badge }) {
  return (
    <section className="panel compact-orders">
      <div className="sectionhead">
        <div>
          <h2>Fila de atendimento</h2>
          <p>
            {orders.filter((o) => o.status !== "Concluída").length} pendentes ·{" "}
            {orders.length} ordens
          </p>
        </div>
        <span className="muted">Selecione uma OS para preencher</span>
      </div>
      <div className="order-list">
        {orders.map((order) => {
          const eq = equipments.find((e) => e.id === order.equipment);
          return (
            <article className="order-row" key={order.id}>
              <div className="order-row-title">
                <div>
                  <a
                    href={"#/os/" + order.id}
                    onClick={(e) => {
                      e.preventDefault();
                      onOpen(order.id);
                    }}
                  >
                    {order.id} <ArrowUpRight size={15} />
                  </a>
                  <h3>{eq?.name}</h3>
                  <span className="muted">{order.date}</span>
                </div>
                <div>
                  <Badge>{order.status}</Badge>
                  <Badge>
                    {order.maintenanceType
                      ? order.maintenanceType +
                        (order.maintenanceType === "COI"
                          ? " · Interna"
                          : " · Externa")
                      : "Execução a definir"}
                  </Badge>
                </div>
              </div>
              <OrderFacts equipment={eq || {}} order={order} />
              <div className="order-row-bottom">
                <p>{order.description}</p>
                <span>
                  Prioridade <Badge>{order.priority}</Badge>
                </span>
                <button className="secondary" onClick={() => onOpen(order.id)}>
                  Abrir OS <ArrowUpRight size={14} />
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
export function OrderDetail({
  order,
  equipment,
  onBack,
  onDraft,
  onRecord,
  Badge,
}) {
  const [error, setError] = useState("");
  const d = order.draft || {};
  const entries = order.entries || [];
  const total = entries.reduce((sum, e) => sum + e.minutes, 0);
  const time = (minutes) =>
    `${Math.floor(minutes / 60)}h ${String(minutes % 60).padStart(2, "0")}min`;
  function change(e) {
    onDraft(order.id, { ...d, [e.target.name]: e.target.value });
    setError("");
  }
  function save(e) {
    e.preventDefault();
    const minutes = Number(d.hours || 0) * 60 + Number(d.minutes || 0);
    if (
      !d.technician?.trim() ||
      !d.work?.trim() ||
      !d.sector?.trim() ||
      !d.date ||
      !["COI", "COE"].includes(d.type)
    ) {
      setError("Preencha técnico, setor, data, execução e serviço realizado.");
      return;
    }
    if (
      !Number.isInteger(minutes) ||
      minutes <= 0 ||
      Number(d.hours || 0) > 24 ||
      Number(d.minutes || 0) > 59 ||
      Number(d.minutes || 0) < 0 ||
      Number(d.hours || 0) < 0 ||
      minutes > 1440
    ) {
      setError(
        "Informe um tempo de trabalho entre 1 minuto e 24 horas por registro.",
      );
      return;
    }
    if (d.type === "COE" && !d.company?.trim()) {
      setError("Informe a empresa responsável pela manutenção externa.");
      return;
    }
    onRecord(order.id, {
      id: crypto.randomUUID(),
      technician: d.technician.trim(),
      sector: d.sector.trim(),
      date: d.date,
      type: d.type,
      company: d.type === "COE" ? d.company.trim() : "",
      work: d.work.trim(),
      parts: d.parts?.trim() || "",
      notes: d.notes?.trim() || "",
      minutes,
    });
    setError("");
  }
  return (
    <div className="os-page">
      <button className="textbtn back-os" onClick={onBack}>
        <ArrowLeft size={16} /> Voltar para ordens de serviço
      </button>
      <section className="panel os-summary">
        <div className="order-row-title">
          <div>
            <span className="os-number">{order.id}</span>
            <h2>{equipment.name}</h2>
            <span className="muted">
              Patrimônio {equipment.id} · Aberta em {order.date}
            </span>
          </div>
          <Badge>{order.status}</Badge>
        </div>
        <OrderFacts equipment={equipment} order={order} />
        <div className="reported">
          <span>Problema relatado</span>
          <p>{order.description}</p>
          <Badge>{order.priority}</Badge>
        </div>
      </section>
      <div className="os-workspace">
        <section className="panel technical-panel">
          <div className="sectionhead">
            <div>
              <h2>Registro do técnico</h2>
              <p>Adicione um registro para cada período de trabalho.</p>
            </div>
            <span className="draft-tag">Rascunho local</span>
          </div>
          <form onSubmit={save} className="technical-form">
            <div className="formgrid">
              <label>
                Técnico responsável
                <input
                  name="technician"
                  value={d.technician || ""}
                  onChange={change}
                  required
                  placeholder="Nome do técnico"
                />
              </label>
              <label>
                Setor do atendimento
                <input
                  name="sector"
                  value={d.sector || ""}
                  onChange={change}
                  required
                  placeholder="Ex.: Centro Cirúrgico"
                />
              </label>
            </div>
            <fieldset className="type-field">
              <legend>Execução da manutenção</legend>
              <div className="type-options">
                {[
                  ["COI", "Interna", "Equipe interna"],
                  ["COE", "Externa", "Empresa externa"],
                ].map(([value, label, note]) => (
                  <label
                    className={
                      d.type === value ? "type-choice chosen" : "type-choice"
                    }
                    key={value}
                  >
                    <input
                      type="radio"
                      name="type"
                      value={value}
                      checked={d.type === value}
                      onChange={change}
                      required
                    />
                    <span>
                      <strong>
                        {value} · {label}
                      </strong>
                      <small>{note}</small>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
            {d.type === "COE" && (
              <label>
                Empresa responsável
                <input
                  name="company"
                  value={d.company || ""}
                  onChange={change}
                  required
                  placeholder="Nome da assistência técnica"
                />
              </label>
            )}
            <div className="time-fields">
              <label>
                Data do serviço
                <input
                  type="date"
                  name="date"
                  value={d.date || ""}
                  onChange={change}
                  required
                />
              </label>
              <label>
                Horas trabalhadas
                <input
                  type="number"
                  name="hours"
                  min="0"
                  max="24"
                  step="1"
                  value={d.hours ?? ""}
                  onChange={change}
                  placeholder="0"
                />
              </label>
              <label>
                Minutos
                <input
                  type="number"
                  name="minutes"
                  min="0"
                  max="59"
                  step="1"
                  value={d.minutes ?? ""}
                  onChange={change}
                  placeholder="0"
                />
              </label>
            </div>
            <label>
              Serviço realizado
              <textarea
                name="work"
                value={d.work || ""}
                onChange={change}
                required
                rows={3}
                placeholder="Descreva a avaliação, o procedimento e os testes realizados."
              />
            </label>
            <div className="formgrid">
              <label>
                Peças e materiais <span className="optional">opcional</span>
                <textarea
                  name="parts"
                  value={d.parts || ""}
                  onChange={change}
                  rows={2}
                  placeholder="Itens utilizados ou substituídos"
                />
              </label>
              <label>
                Observações e pendências{" "}
                <span className="optional">opcional</span>
                <textarea
                  name="notes"
                  value={d.notes || ""}
                  onChange={change}
                  rows={2}
                  placeholder="Próximos passos do atendimento"
                />
              </label>
            </div>
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
            <div className="record-actions">
              <span className="muted">
                Horas de trabalho efetivo, sem tempo de espera.
              </span>
              <button className="primary" type="submit">
                <Save size={16} />
                Salvar registro
              </button>
            </div>
          </form>
        </section>
        <aside className="panel records-panel">
          <div className="sectionhead">
            <div>
              <h2>Histórico de trabalho</h2>
              <p>{entries.length} registros nesta OS</p>
            </div>
            <Clock size={18} />
          </div>
          <div className="hours-total">
            <span>Total de horas técnicas</span>
            <strong>{time(total)}</strong>
          </div>
          {!entries.length ? (
            <div className="records-empty">
              <Plus size={23} />
              <strong>Nenhum serviço registrado</strong>
              <p>
                O primeiro registro aparecerá aqui com o técnico e as horas
                trabalhadas.
              </p>
            </div>
          ) : (
            <div className="work-entries">
              {[...entries].reverse().map((entry) => (
                <article key={entry.id}>
                  <div className="entry-heading">
                    <strong>{entry.technician}</strong>
                    <b>{time(entry.minutes)}</b>
                  </div>
                  <small>
                    {entry.date.split("-").reverse().join("/")} · {entry.type} ·{" "}
                    {entry.sector}
                  </small>
                  {entry.company && (
                    <p className="entry-company">{entry.company}</p>
                  )}
                  <p className="entry-work">{entry.work}</p>
                  {entry.parts && (
                    <p>
                      <strong>Peças:</strong> {entry.parts}
                    </p>
                  )}
                  {entry.notes && (
                    <p>
                      <strong>Pendências:</strong> {entry.notes}
                    </p>
                  )}
                </article>
              ))}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

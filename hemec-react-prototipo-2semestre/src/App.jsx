import { OrdersList, OrderDetail } from "./OrderPages";
import React, { useState, useEffect } from "react";
import {
  Activity,
  LayoutDashboard,
  Monitor,
  ClipboardList,
  Plus,
  Search,
  ArrowUpRight,
  ChevronRight,
  Check,
  Menu,
  X,
  Clock,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";
const initial = [
  {
    id: "EQ-001",
    name: "Monitor multiparamétrico",
    model: "IntelliVue MX450",
    brand: "Philips",
    serial: "MX450-0148",
    sector: "UTI Adulto",
    status: "Operando",
    critical: "Alta",
    date: "18 out 2026",
  },
  {
    id: "EQ-002",
    name: "Bomba de infusão",
    model: "Infusomat",
    brand: "B. Braun",
    serial: "INF-2087",
    sector: "Centro Cirúrgico",
    status: "Aguardando reparo",
    critical: "Alta",
    date: "10 out 2026",
  },
  {
    id: "EQ-003",
    name: "Ventilador pulmonar",
    model: "Savina 300",
    brand: "Dräger",
    serial: "SAV-3102",
    sector: "UTI Adulto",
    status: "Em manutenção",
    critical: "Alta",
    date: "08 out 2026",
  },
  {
    id: "EQ-004",
    name: "Eletrocardiógrafo",
    model: "MAC 600",
    brand: "GE",
    serial: "MAC-0604",
    sector: "Ambulatório",
    status: "Operando",
    critical: "Moderada",
    date: "25 out 2026",
  },
  {
    id: "EQ-005",
    name: "Desfibrilador",
    model: "HeartStart",
    brand: "Philips",
    serial: "HS-0519",
    sector: "Pronto Atendimento",
    status: "Operando",
    critical: "Alta",
    date: "12 out 2026",
  },
];
const baseOrders = [
  {
    id: "OS-0042",
    equipment: "EQ-002",
    openedBy: "Ana Martins",
    sector: "Centro Cirúrgico",
    description: "Alarme intermitente durante a infusão",
    priority: "Alta",
    status: "Aberta",
    date: "08 out 2026",
  },
  {
    id: "OS-0041",
    equipment: "EQ-003",
    openedBy: "Carlos Lima",
    sector: "UTI Adulto",
    description: "Verificação do sensor de pressão",
    priority: "Alta",
    status: "Em atendimento",
    date: "07 out 2026",
  },
];
function Badge({ children }) {
  return (
    <span
      className={
        "badge " +
        ({
          Operando: "green",
          Concluída: "green",
          "Em manutenção": "blue",
          "Em atendimento": "blue",
          "Aguardando reparo": "amber",
          Aberta: "amber",
          Alta: "red",
        }[children] || "neutral")
      }
    >
      {children}
    </span>
  );
}
function EquipmentTable({ items, onSelect }) {
  return (
    <div className="tablewrap">
      <table>
        <thead>
          <tr>
            <th>Equipamento</th>
            <th>Setor</th>
            <th>Situação</th>
            <th>Criticidade</th>
            <th>Preventiva prevista</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {items.map((e) => (
            <tr key={e.id}>
              <td>
                <button className="item" onClick={() => onSelect(e)}>
                  <span className="device">
                    <Monitor size={20} />
                  </span>
                  <span>
                    <strong>{e.name}</strong>
                    <small>
                      {e.id} · {e.model}
                    </small>
                  </span>
                </button>
              </td>
              <td>{e.sector}</td>
              <td>
                <Badge>{e.status}</Badge>
              </td>
              <td>{e.critical}</td>
              <td>{e.date}</td>
              <td>
                <button
                  className="icon"
                  aria-label={"Ver " + e.name}
                  onClick={() => onSelect(e)}
                >
                  <ChevronRight size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!items.length && (
        <p className="empty">
          Nenhum equipamento encontrado. Tente outro termo.
        </p>
      )}
    </div>
  );
}
function restore(key, fallback) {
  try {
    const data = JSON.parse(localStorage.getItem(key));
    return Array.isArray(data) ? data : fallback;
  } catch {
    return fallback;
  }
}
export default function App() {
  const [page, setPage] = useState(
      location.hash.startsWith("#/os/") ? "Ordens de serviço" : "Visão geral",
    ),
    [equipments, setEquipments] = useState(() =>
      restore("hemec-v2-equipments", initial),
    ),
    [orders, setOrders] = useState(() =>
      restore("hemec-v2-orders", baseOrders),
    ),
    [query, setQuery] = useState(""),
    [filter, setFilter] = useState("Todos"),
    [selected, setSelected] = useState(null),
    [modal, setModal] = useState(null),
    [toast, setToast] = useState(""),
    [mobile, setMobile] = useState(false),
    [chosen, setChosen] = useState("");
  const [orderId, setOrderId] = useState(() =>
    location.hash.startsWith("#/os/")
      ? decodeURIComponent(location.hash.slice(5))
      : null,
  );
  const [storageOk, setStorageOk] = useState(true);
  useEffect(() => {
    try {
      localStorage.setItem("hemec-v2-equipments", JSON.stringify(equipments));
      localStorage.setItem("hemec-v2-orders", JSON.stringify(orders));
      setStorageOk(true);
    } catch {
      setStorageOk(false);
    }
  }, [equipments, orders]);
  useEffect(() => {
    const sync = () => {
      const id = location.hash.startsWith("#/os/")
        ? decodeURIComponent(location.hash.slice(5))
        : null;
      setOrderId(id);
      if (id) setPage("Ordens de serviço");
    };
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);
  const activeOrder = orders.find((o) => o.id === orderId);
  const openOrder = (id) => {
    setOrderId(id);
    setPage("Ordens de serviço");
    setSelected(null);
    setMobile(false);
    location.hash = "/os/" + id;
    window.scrollTo(0, 0);
  };
  const updateDraft = (id, draft) =>
    setOrders((current) =>
      current.map((o) => (o.id === id ? { ...o, draft } : o)),
    );
  const recordWork = (id, entry) => {
    setOrders((current) =>
      current.map((o) =>
        o.id === id
          ? {
              ...o,
              status: "Em atendimento",
              maintenanceType: entry.type,
              entries: [...(o.entries || []), entry],
              draft: {
                technician: entry.technician,
                sector: entry.sector,
                type: entry.type,
                company: entry.company,
                date: entry.date,
              },
            }
          : o,
      ),
    );
    setEquipments((current) =>
      current.map((eq) =>
        eq.id === activeOrder.equipment
          ? { ...eq, status: "Em manutenção" }
          : eq,
      ),
    );
    notify("Registro adicionado ao histórico desta OS.");
  };
  const notify = (t) => {
    setToast(t);
    setTimeout(() => setToast(""), 4500);
  };
  const go = (p) => {
    setPage(p);
    setOrderId(null);
    if (location.hash) location.hash = "";
    setQuery("");
    setFilter("Todos");
    setMobile(false);
  };
  const openRequest = (e) => {
    setChosen(e?.id || "");
    setSelected(null);
    setModal("request");
  };
  const filtered = equipments.filter(
    (e) =>
      (filter === "Todos" || e.status === filter) &&
      `${e.name} ${e.model} ${e.id} ${e.sector}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  const pending = orders.filter((o) => o.status !== "Concluída");
  function submit(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (modal === "request") {
      if (f.get("description").trim().length < 10) {
        notify("Descreva o problema com pelo menos 10 caracteres.");
        return;
      }
      const id = chosen;
      setOrders([
        ...orders,
        {
          id: "OS-" + String(orders.length + 43).padStart(4, "0"),
          equipment: id,
          openedBy: f.get("openedBy").trim(),
          sector: equipments.find((eq) => eq.id === id)?.sector,
          description: f.get("description").trim(),
          priority: f.get("priority"),
          status: "Aberta",
          date: "08 out 2026",
        },
      ]);
      setEquipments(
        equipments.map((x) =>
          x.id === id
            ? {
                ...x,
                status:
                  x.status === "Em manutenção"
                    ? "Em manutenção"
                    : "Aguardando reparo",
              }
            : x,
        ),
      );
      go("Ordens de serviço");
      notify("Chamado simulado criado. Uma ordem foi adicionada ao quadro.");
    } else {
      const patr = f.get("id").trim();
      if (equipments.some((x) => x.id.toLowerCase() === patr.toLowerCase())) {
        notify("Este patrimônio já está cadastrado.");
        return;
      }
      setEquipments([
        ...equipments,
        {
          id: patr,
          name: f.get("name").trim(),
          model: f.get("model").trim(),
          brand: f.get("brand").trim(),
          serial: f.get("serial").trim(),
          sector: f.get("sector"),
          critical: f.get("critical"),
          status: "Operando",
          date: "Não definida",
        },
      ]);
      setPage("Equipamentos");
      notify("Equipamento adicionado à demonstração.");
    }
    setModal(null);
  }
  return (
    <div className="app">
      <aside className={mobile ? "sidebar open" : "sidebar"}>
        <a
          className="brand"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            go("Visão geral");
          }}
        >
          <span>
            <Activity />
          </span>
          hemec<span className="branddot">.</span>
        </a>
        <div className="workspace">
          <span className="hospital">H</span>
          <div>
            <strong>Hospital de demonstração</strong>
            <small>Engenharia Clínica</small>
          </div>
        </div>
        <div className="navlabel">ÁREA DE TRABALHO</div>
        <nav>
          {[
            [LayoutDashboard, "Visão geral"],
            [Monitor, "Equipamentos"],
            [ClipboardList, "Ordens de serviço"],
          ].map(([Icon, label]) => (
            <button
              key={label}
              className={page === label ? "active" : ""}
              onClick={() => go(label)}
            >
              <Icon size={20} />
              {label}
              {label === "Ordens de serviço" && (
                <span className="count">{pending.length}</span>
              )}
            </button>
          ))}
        </nav>
        <div className="sidebottom">
          <div className="demo">
            <ShieldCheck size={18} />
            <div>
              <strong>Ambiente de protótipo</strong>
              <small>Dados fictícios · sem backend</small>
            </div>
          </div>
          <div className="profile">
            <span>GS</span>
            <div>
              <strong>Gabriel Santoni</strong>
              <small>Visualização de gestor</small>
            </div>
          </div>
        </div>
      </aside>
      <div className="main">
        <header>
          <button
            className="mobile icon"
            onClick={() => setMobile(!mobile)}
            aria-label="Abrir menu"
          >
            <Menu />
          </button>
          <div className="breadcrumb">
            Área de trabalho <ChevronRight size={14} /> <strong>{page}</strong>
          </div>
          <span className="date">Quinta-feira, 08 de outubro de 2026</span>
          <span className="proto">PROTÓTIPO 02</span>
        </header>
        <main>
          {!orderId && (
            <div className="pageheading">
              <div>
                <p className="eyebrow">ENGENHARIA CLÍNICA</p>
                <h1>
                  {page === "Visão geral"
                    ? "O cuidado começa pela disponibilidade."
                    : page}
                </h1>
                <p className="subtitle">
                  {page === "Visão geral"
                    ? "Acompanhe os equipamentos e organize o que precisa de atenção."
                    : page === "Equipamentos"
                      ? "Localize um equipamento e consulte sua situação."
                      : "Acompanhe os chamados da abertura ao atendimento."}
                </p>
              </div>
              <button
                className="primary"
                onClick={() =>
                  page === "Equipamentos"
                    ? setModal("equipment")
                    : openRequest()
                }
              >
                <Plus size={18} />
                {page === "Equipamentos"
                  ? "Cadastrar equipamento"
                  : "Abrir chamado"}
              </button>
            </div>
          )}
          {page === "Visão geral" && (
            <>
              <div className="stats">
                {[
                  [
                    Monitor,
                    "Equipamentos cadastrados",
                    equipments.length,
                    "Inventário da demonstração",
                    "",
                  ],
                  [
                    ShieldCheck,
                    "Em funcionamento",
                    equipments.filter((e) => e.status === "Operando").length,
                    "Disponíveis para uso",
                    "green",
                  ],
                  [
                    AlertTriangle,
                    "Precisam de atenção",
                    equipments.filter((e) => e.status !== "Operando").length,
                    "Manutenção ou reparo",
                    "amber",
                  ],
                  [
                    ClipboardList,
                    "Ordens em aberto",
                    pending.length,
                    "Acompanhar atendimento",
                    "blue",
                  ],
                ].map(([Icon, label, value, note, color]) => (
                  <article className="stat" key={label}>
                    <div>
                      <span>{label}</span>
                      <Icon size={20} />
                    </div>
                    <strong>{String(value).padStart(2, "0")}</strong>
                    <small className={color}>{note}</small>
                  </article>
                ))}
              </div>
              <div className="overview">
                <section className="panel attention">
                  <div className="sectionhead">
                    <div>
                      <h2>Prioridades de hoje</h2>
                      <p>Comece pelos atendimentos pendentes.</p>
                    </div>
                    <span className="badge amber">
                      {pending.length} pendentes
                    </span>
                  </div>
                  {pending.length ? (
                    pending.slice(0, 3).map((o) => (
                      <button
                        className="priorityrow"
                        key={o.id}
                        onClick={() => {
                          go("Ordens de serviço");
                        }}
                      >
                        <span className="priorityicon">
                          <ClipboardList size={20} />
                        </span>
                        <div>
                          <strong>
                            {equipments.find((e) => e.id === o.equipment)?.name}
                          </strong>
                          <small>{o.description}</small>
                          <span>
                            {o.id} ·{" "}
                            {
                              equipments.find((e) => e.id === o.equipment)
                                ?.sector
                            }
                          </span>
                        </div>
                        <Badge>{o.status}</Badge>
                        <ChevronRight size={18} />
                      </button>
                    ))
                  ) : (
                    <p className="empty">Nenhum atendimento pendente.</p>
                  )}
                </section>
                <section className="schedule">
                  <div className="sectionhead">
                    <h2>Próximas preventivas</h2>
                    <Clock size={20} />
                  </div>
                  <p>Programação ilustrativa · outubro</p>
                  {equipments
                    .filter(
                      (e) =>
                        e.status === "Operando" && e.date !== "Não definida",
                    )
                    .slice(0, 3)
                    .map((e) => (
                      <button key={e.id} onClick={() => setSelected(e)}>
                        <span className="calendar">
                          <b>{e.date.split(" ")[0]}</b>OUT
                        </span>
                        <div>
                          <strong>{e.name}</strong>
                          <small>{e.sector}</small>
                        </div>
                      </button>
                    ))}
                </section>
              </div>
            </>
          )}
          {orderId ? (
            activeOrder ? (
              <OrderDetail
                key={activeOrder.id}
                order={{
                  ...activeOrder,
                  draft: activeOrder.draft || {
                    sector:
                      activeOrder.sector ||
                      equipments.find((e) => e.id === activeOrder.equipment)
                        ?.sector,
                  },
                }}
                equipment={equipments.find(
                  (e) => e.id === activeOrder.equipment,
                )}
                onBack={() => go("Ordens de serviço")}
                onDraft={updateDraft}
                onRecord={recordWork}
                Badge={Badge}
              />
            ) : (
              <section className="panel">
                <p className="empty">OS não encontrada neste navegador.</p>
                <button
                  className="secondary"
                  onClick={() => go("Ordens de serviço")}
                >
                  Voltar para ordens de serviço
                </button>
              </section>
            )
          ) : page !== "Ordens de serviço" ? (
            <section className="panel">
              <div className="sectionhead">
                <div>
                  <h2>
                    {page === "Visão geral"
                      ? "Equipamentos em acompanhamento"
                      : "Inventário de equipamentos"}
                  </h2>
                  <p>{equipments.length} equipamentos na demonstração</p>
                </div>
                {page === "Visão geral" && (
                  <button
                    className="textbtn"
                    onClick={() => go("Equipamentos")}
                  >
                    Ver inventário <ArrowUpRight size={16} />
                  </button>
                )}
              </div>
              <div className="toolbar">
                <label className="search">
                  <Search size={18} />
                  <input
                    aria-label="Buscar equipamento"
                    placeholder="Buscar por nome, patrimônio ou setor"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </label>
                <select
                  aria-label="Filtrar situação"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  {[
                    "Todos",
                    "Operando",
                    "Aguardando reparo",
                    "Em manutenção",
                  ].map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              <EquipmentTable items={filtered} onSelect={setSelected} />
            </section>
          ) : (
            <OrdersList
              orders={orders}
              equipments={equipments}
              onOpen={openOrder}
              Badge={Badge}
            />
          )}
          <footer>
            HEMEC · Controle de manutenção hospitalar{" "}
            <span>
              {storageOk
                ? "Demonstração · Salvo somente neste navegador, sem envio ao hospital."
                : "Armazenamento indisponível. As alterações serão perdidas ao atualizar."}
            </span>
          </footer>
        </main>
      </div>
      {selected && (
        <div className="overlay" onClick={() => setSelected(null)}>
          <section
            className="drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Detalhes do equipamento"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close icon"
              aria-label="Fechar detalhes"
              onClick={() => setSelected(null)}
            >
              <X />
            </button>
            <span className="device large">
              <Monitor size={32} />
            </span>
            <p className="eyebrow">{selected.id}</p>
            <h2>{selected.name}</h2>
            <p>{selected.model}</p>
            <Badge>{selected.status}</Badge>
            <dl>
              <dt>Setor</dt>
              <dd>{selected.sector}</dd>
              <dt>Criticidade do equipamento</dt>
              <dd>{selected.critical}</dd>
              <dt>Preventiva prevista</dt>
              <dd>{selected.date}</dd>
            </dl>
            <h3>Atendimentos vinculados</h3>
            {orders.filter((o) => o.equipment === selected.id).length ? (
              orders
                .filter((o) => o.equipment === selected.id)
                .map((o) => (
                  <div className="history" key={o.id}>
                    <button className="textbtn" onClick={() => openOrder(o.id)}>
                      {o.id} · Abrir OS
                    </button>
                    <p>{o.description}</p>
                    <Badge>{o.status}</Badge>
                  </div>
                ))
            ) : (
              <p className="muted">Nenhum chamado nesta demonstração.</p>
            )}
            <button
              className="primary full"
              onClick={() => openRequest(selected)}
            >
              <Plus size={18} />
              Abrir chamado para este equipamento
            </button>
          </section>
        </div>
      )}
      {modal && (
        <div className="overlay">
          <section
            className="dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <button
              className="close icon"
              aria-label="Fechar formulário"
              onClick={() => setModal(null)}
            >
              <X />
            </button>
            <p className="eyebrow">
              {modal === "request" ? "SOLICITAÇÃO DE MANUTENÇÃO" : "INVENTÁRIO"}
            </p>
            <h2 id="modal-title">
              {modal === "request"
                ? "O que aconteceu?"
                : "Cadastrar equipamento"}
            </h2>
            <p className="subtitle">
              {modal === "request"
                ? "Identifique o equipamento e descreva o problema."
                : "Preencha os dados essenciais para a demonstração."}
            </p>
            <form onSubmit={submit}>
              {modal === "request" ? (
                <>
                  <label>
                    Equipamento
                    <select
                      required
                      value={chosen}
                      onChange={(e) => setChosen(e.target.value)}
                    >
                      <option value="">Selecione o equipamento</option>
                      {equipments.map((e) => (
                        <option key={e.id} value={e.id}>
                          {e.id} · {e.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Aberto por
                    <input
                      name="openedBy"
                      required
                      defaultValue="Gabriel Santoni"
                      placeholder="Nome do solicitante"
                    />
                  </label>
                  {chosen && (
                    <p className="context">
                      Setor: {equipments.find((e) => e.id === chosen)?.sector}
                    </p>
                  )}
                  <label>
                    Descrição do problema
                    <textarea
                      name="description"
                      required
                      minLength={10}
                      placeholder="Ex.: o equipamento apresenta um alarme ao ser ligado."
                      rows={4}
                    />
                  </label>
                  <label>
                    Prioridade do chamado
                    <select name="priority" required>
                      <option value="">Selecione</option>
                      <option>Alta</option>
                      <option>Moderada</option>
                      <option>Baixa</option>
                    </select>
                  </label>
                  <p className="hint">
                    A prioridade do chamado é diferente da criticidade do
                    equipamento.
                  </p>
                </>
              ) : (
                <>
                  <div className="formgrid">
                    <label>
                      Patrimônio
                      <input name="id" required placeholder="EQ-006" />
                    </label>
                    <label>
                      Nome
                      <input
                        name="name"
                        required
                        placeholder="Bomba de infusão"
                      />
                    </label>
                  </div>
                  <label>
                    Modelo
                    <input
                      name="model"
                      required
                      placeholder="Modelo do equipamento"
                    />
                  </label>
                  <div className="formgrid">
                    <label>
                      Marca
                      <input name="brand" required placeholder="Fabricante" />
                    </label>
                    <label>
                      Número de série
                      <input name="serial" required placeholder="Nº de série" />
                    </label>
                  </div>
                  <div className="formgrid">
                    <label>
                      Setor
                      <select name="sector">
                        {[
                          "UTI Adulto",
                          "Centro Cirúrgico",
                          "Ambulatório",
                          "Pronto Atendimento",
                        ].map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </label>
                    <label>
                      Criticidade
                      <select name="critical">
                        <option>Alta</option>
                        <option>Moderada</option>
                        <option>Baixa</option>
                      </select>
                    </label>
                  </div>
                </>
              )}
              <div className="formactions">
                <button
                  type="button"
                  className="secondary"
                  onClick={() => setModal(null)}
                >
                  Cancelar
                </button>
                <button className="primary" type="submit">
                  {modal === "request"
                    ? "Criar chamado de demonstração"
                    : "Adicionar equipamento"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
      {toast && (
        <div className="toast" role="status">
          <Check size={18} />
          {toast}
        </div>
      )}
    </div>
  );
}

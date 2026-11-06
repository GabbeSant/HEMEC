import { workOrderService } from "./workOrderService";

// Mesmo mecanismo local dos chamados, em uma coleção separada por entidade.
const storageKey = "hemec-attendances-v1";

function readAttendances() {
  const saved = localStorage.getItem(storageKey);
  if (saved === null) return [];
  const payload = JSON.parse(saved);
  if (
    payload?.version !== 1 ||
    !Array.isArray(payload.attendances) ||
    !payload.attendances.every((item) =>
      item &&
      ["id", "orderId", "technician", "performedAt", "sector", "description"].every(
        (key) => typeof item[key] === "string" && item[key].trim(),
      ) &&
      Number.isFinite(Date.parse(item.performedAt)) &&
      Number.isSafeInteger(item.workedMinutes) && item.workedMinutes > 0 &&
      ["COI", "COE"].includes(item.classification) &&
      typeof item.company === "string" &&
      (item.classification !== "COE" || item.company.trim()),
    )
  ) {
    throw new Error("Registros de atendimento inválidos");
  }
  return payload.attendances;
}

export const attendanceService = {
  async list(orderId) {
    return readAttendances().filter((item) => item.orderId === orderId);
  },

  async create({ orderId, technician, performedAt, sector, description, hours, minutes, classification, company }) {
    if ([technician, sector, description].some((value) => typeof value !== "string" || !value.trim())) {
      throw new Error("Informe técnico, setor e serviço executado.");
    }
    if (typeof performedAt !== "string" || !Number.isFinite(Date.parse(performedAt))) {
      throw new Error("Informe a data do atendimento.");
    }
    const workedMinutes = hours * 60 + minutes;
    if (
      !Number.isSafeInteger(hours) || hours < 0 ||
      !Number.isInteger(minutes) || minutes < 0 || minutes > 59 ||
      !Number.isSafeInteger(workedMinutes) || workedMinutes <= 0
    ) {
      throw new Error("Informe horas inteiras e minutos entre 0 e 59, com tempo total maior que zero.");
    }
    if (!["COI", "COE"].includes(classification)) {
      throw new Error("Selecione COI ou COE.");
    }
    if (classification === "COE" && (typeof company !== "string" || !company.trim())) {
      throw new Error("Informe a empresa responsável pela manutenção externa.");
    }
    if (!await workOrderService.getById(orderId)) {
      throw new Error("Ordem de serviço não encontrada.");
    }

    const attendances = readAttendances();
    const attendance = {
      id: crypto.randomUUID(),
      orderId,
      technician: technician.trim(),
      performedAt: new Date(performedAt).toISOString(),
      sector: sector.trim(),
      description: description.trim(),
      workedMinutes,
      classification,
      company: classification === "COE" ? company.trim() : "",
    };
    localStorage.setItem(storageKey, JSON.stringify({ version: 1, attendances: [...attendances, attendance] }));
    return attendance;
  },
};

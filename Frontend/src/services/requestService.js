import { equipmentService } from "./equipmentService";

const storageKey = "hemec-requests-v1";

function readRequests() {
  const saved = localStorage.getItem(storageKey);
  if (saved === null) return [];
  const payload = JSON.parse(saved);
  if (
    payload.version !== 1 ||
    !Array.isArray(payload.requests) ||
    !payload.requests.every(
      (item) =>
        item &&
        [
          "id",
          "reference",
          "equipmentId",
          "equipmentName",
          "asset",
          "sector",
          "description",
          "createdAt",
        ].every((key) => typeof item[key] === "string") &&
        item.status === "Aberto" &&
        typeof item.requester?.email === "string" &&
        typeof item.requester?.name === "string" &&
        Number.isFinite(Date.parse(item.createdAt)),
    )
  ) {
    throw new Error("Registros de chamados inválidos");
  }
  return payload.requests;
}

// Provedor local autorizado. Não é contrato de API e não cria OS.
export const requestService = {
  async list() {
    return readRequests();
  },
  async create({ equipmentId, description, requester }) {
    if (!description?.trim()) throw new Error("Descreva o problema relatado.");
    if (!requester?.email || !requester?.name)
      throw new Error("Entre no sistema para registrar o chamado.");
    const equipment = (await equipmentService.list()).find(
      (item) => item.id === equipmentId,
    );
    if (!equipment)
      throw new Error("Selecione um equipamento disponível no inventário.");
    const requests = readRequests();
    const id = crypto.randomUUID();
    const request = {
      id,
      reference: `CH-${id.toUpperCase()}`,
      equipmentId,
      equipmentName: equipment.name,
      asset: equipment.asset,
      sector: equipment.sector,
      description: description.trim(),
      requester: { name: requester.name, email: requester.email },
      createdAt: new Date().toISOString(),
      status: "Aberto",
    };
    localStorage.setItem(
      storageKey,
      JSON.stringify({ version: 1, requests: [...requests, request] }),
    );
    return request;
  },
};

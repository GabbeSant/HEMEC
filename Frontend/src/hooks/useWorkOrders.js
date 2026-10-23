import { useEffect, useState } from "react";
import { workOrderService } from "../services/workOrderService";

// Compartilha carregamento e nova tentativa entre lista e detalhes de consulta.
export function useWorkOrders(orderId = null) {
  const [result, setResult] = useState({ status: "loading", data: null });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setResult({ status: "loading", data: null });
    async function load() {
      try {
        const data =
          orderId === null
            ? await workOrderService.list()
            : await workOrderService.getById(orderId);
        if (orderId === null && !Array.isArray(data)) {
          throw new Error("Lista de OS inválida");
        }
        if (!cancelled) setResult({ status: "success", data });
      } catch {
        if (!cancelled) setResult({ status: "error", data: null });
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [orderId, attempt]);

  return { ...result, retry: () => setAttempt((current) => current + 1) };
}

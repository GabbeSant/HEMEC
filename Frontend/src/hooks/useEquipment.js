import { useEffect, useState } from "react";
import { equipmentService } from "../services/equipmentService";

export function useEquipment() {
  const [result, setResult] = useState({ status: "loading", equipment: [] });
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let cancelled = false;
    setResult({ status: "loading", equipment: [] });
    async function load() {
      try {
        const equipment = await equipmentService.list();
        if (!Array.isArray(equipment)) throw new Error("Lista de equipamentos inválida");
        if (!cancelled) setResult({ status: "success", equipment });
      } catch {
        if (!cancelled) setResult({ status: "error", equipment: [] });
      }
    }
    load();
    return () => { cancelled = true; };
  }, [attempt]);
  return { ...result, retry: () => setAttempt((value) => value + 1) };
}

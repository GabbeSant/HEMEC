import { useEffect, useState } from "react";
import { attendanceService } from "../services/attendanceService";

export function useAttendances(orderId) {
  const [result, setResult] = useState({ status: "loading", attendances: [] });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setResult({ status: "loading", attendances: [] });
    attendanceService.list(orderId)
      .then((attendances) => {
        if (!Array.isArray(attendances)) throw new Error("Lista de atendimentos inválida");
        if (!cancelled) setResult({ status: "success", attendances });
      })
      .catch(() => {
        if (!cancelled) setResult({ status: "error", attendances: [] });
      });
    return () => { cancelled = true; };
  }, [orderId, attempt]);

  return { ...result, retry: () => setAttempt((value) => value + 1) };
}

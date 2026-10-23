import { useEffect, useState } from "react";
import { requestService } from "../services/requestService";

export function useRequests() {
  const [result, setResult] = useState({ status: "loading", requests: [] });
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let cancelled = false;
    setResult({ status: "loading", requests: [] });
    requestService
      .list()
      .then((requests) => {
        if (!cancelled) setResult({ status: "success", requests });
      })
      .catch(() => {
        if (!cancelled) setResult({ status: "error", requests: [] });
      });
    return () => {
      cancelled = true;
    };
  }, [attempt]);
  return { ...result, retry: () => setAttempt((value) => value + 1) };
}

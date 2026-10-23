const dateFormatter = new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" });

// Datas de calendário não mudam de dia com o fuso horário do navegador.
export function formatDateOnly(value) {
  if (!value) return "Não informada";
  const date = new Date(value);
  return Number.isFinite(date.getTime()) ? dateFormatter.format(date) : "Não informada";
}

const formatter = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short",
  timeStyle: "short",
});

export function formatDateTime(value) {
  const date = new Date(value);
  return Number.isFinite(date.getTime()) ? formatter.format(date) : "Não informada";
}

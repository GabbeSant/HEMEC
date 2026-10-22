const normalize = (value) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR");

// Compartilha a busca do inventário com outras telas, sem acessar os dados.
export function filterEquipment(equipment, { query = "", status = "" } = {}) {
  const terms = normalize(query).trim().split(/\s+/).filter(Boolean);

  return equipment.filter((item) => {
    const text = normalize(
      [
        item.asset,
        item.name,
        item.serial,
        item.brand,
        item.model,
        item.sector,
      ].join(" "),
    );
    return (
      (!status || item.status === status) &&
      terms.every((term) => text.includes(term))
    );
  });
}

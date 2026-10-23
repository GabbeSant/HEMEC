export function filterWorkOrders(orders, { status = "", priority = "", pending = false } = {}) {
  return orders.filter((order) =>
    (!status || order.status === status) &&
    (!priority || order.priority === priority) &&
    (!pending || order.status !== "Concluída"),
  );
}

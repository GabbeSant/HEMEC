import { demoWorkOrders } from "../data/demoWorkOrders";
import { equipmentService } from "./equipmentService";

// Provedor de demonstração somente para consulta; não representa contrato de API.
export const workOrderService = {
  async list() {
    const equipment = await equipmentService.list();
    return demoWorkOrders.map((order) => ({
      ...order,
      equipment:
        equipment.find((item) => item.id === order.equipmentId) ?? null,
    }));
  },
  async getById(id) {
    const orders = await workOrderService.list();
    return orders.find((order) => order.id === id) ?? null;
  },
};

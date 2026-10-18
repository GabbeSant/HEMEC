import { demoEquipment } from "../data/demoEquipment";

// A página usa este contrato assíncrono. A API terá um adaptador próprio.
export const equipmentService = {
  async list() {
    return demoEquipment.map(equipment => ({ ...equipment }));
  },
};

import Flux from 'flux-state'

export const INVENTORY_EVENT = 'INVENTORY_EVENT';
export const INVENTORY_ERROR_EVENT = 'INVENTORY_ERROR_EVENT';
export const INVENTORY_DETAIL_EVENT= 'INVENTORY_DETAIL_EVENT';
export const INVENTORY_DETAIL_ERROR = 'INVENTORY_DETAIL_ERROR';

class InventoryStore extends Flux.DashStore {
  constructor() {
    super();
    this.addEvent(INVENTORY_EVENT);
    this.addEvent(INVENTORY_ERROR_EVENT);
    this.addEvent(INVENTORY_DETAIL_EVENT);
    this.addEvent(INVENTORY_DETAIL_ERROR);
  }
}

const inventoryStore = new InventoryStore();

export { inventoryStore };
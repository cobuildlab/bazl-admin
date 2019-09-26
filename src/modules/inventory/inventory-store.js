import Flux from 'flux-state';

export const INVENTORY_EVENT = 'INVENTORY_EVENT';
export const INVENTORY_ERROR_EVENT = 'INVENTORY_ERROR_EVENT';
export const INVENTORY_DETAIL_EVENT = 'INVENTORY_DETAIL_EVENT';
export const INVENTORY_UPDATE_EVENT = 'INVENTORY_UPDATE_EVENT';
export const INVENTORY_DELETE_EVENT = 'INVENTORY_DELETE_EVENT';
export const SETTINGS_EVENT = 'SETTINGS_EVENT';

class InventoryStore extends Flux.DashStore {
  constructor() {
    super();
    this.addEvent(INVENTORY_EVENT);
    this.addEvent(INVENTORY_ERROR_EVENT);
    this.addEvent(INVENTORY_DETAIL_EVENT);
    this.addEvent(INVENTORY_UPDATE_EVENT);
    this.addEvent(INVENTORY_DELETE_EVENT);
    this.addEvent(SETTINGS_EVENT);
  }
}

const inventoryStore = new InventoryStore();

export { inventoryStore };

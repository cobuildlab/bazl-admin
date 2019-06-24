import Flux from 'flux-state';

/**
 * @property {string} PRODUCT_EVENT triggers when a user tries to upload a new product
 * @property {string} PRODUCT_ERROR_EVENT shows an error when the product info is wrong or badly formated
 */

export const PRODUCT_EVENT = 'PRODUCT_EVENT';
export const PRODUCT_ERROR_EVENT = 'PRODUCT_ERROR_EVENT';
export const IMPORT_EVENT = 'IMPORT_EVENT';
export const IMPORT_ERROR = 'IMPORT_ERROR';
class ProductStore extends Flux.DashStore {
  constructor() {
    super();
    this.addEvent(PRODUCT_EVENT);
    this.addEvent(PRODUCT_ERROR_EVENT);
    this.addEvent(IMPORT_EVENT);
    this.addEvent(IMPORT_ERROR);
  }
}

const productStore = new ProductStore();

export { productStore };

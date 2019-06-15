import Flux from 'flux-state';

export const SALE_EVENT = 'SALE_EVENT';
export const SALE_ERROR = 'SALE_ERROR';
export const DETAIL_EVENT = 'DETAIL_EVENT';
export const DETAIL_ERROR = 'DETAIL_ERROR';
export const STAT_EVENT = 'STAT_EVENT';
export const STAT_ERROR = 'STAT_ERROR';
export const UPLOAD_EVENT = 'UPLOAD_EVENT';
export const UPLOAD_ERROR = 'UPLOAD_ERROR';

class SalesStore extends Flux.DashStore {
  constructor() {
    super();
    this.addEvent(SALE_EVENT);
    this.addEvent(SALE_ERROR);
    this.addEvent(DETAIL_EVENT);
    this.addEvent(DETAIL_ERROR);
    this.addEvent(STAT_EVENT);
    this.addEvent(STAT_ERROR);
    this.addEvent(UPLOAD_EVENT);
    this.addEvent(UPLOAD_ERROR);
  }
}

const salesStore = new SalesStore();

export { salesStore };

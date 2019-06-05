import Flux from 'flux-state';


export const SALE_EVENT = "SALE_EVENT";
export const SALE_ERROR = "SALE_ERROR";
export const DETAIL_EVENT = "DETAIL_EVENT";
export const DETAIL_ERROR = "DETAIL_ERROR";
export const STAT_EVENT = "STAT_EVENT";
export const STAT_ERROR = "STAT_ERROR";
export const RECEIPT_EVENT = "RECEIPT_EVENT";
export const RECEIPT_ERROR = "RECEIPT_ERROR";



class SalesStore extends Flux.DashStore{
    constructor(){
        super();
        this.addEvent(SALE_EVENT);
        this.addEvent(SALE_ERROR);
        this.addEvent(DETAIL_EVENT);
        this.addEvent(DETAIL_ERROR);
        this.addEvent(STAT_EVENT);
        this.addEvent(STAT_ERROR);
        this.addEvent(RECEIPT_EVENT);
        this.addEvent(RECEIPT_ERROR);

    }
}

const salesStore = new SalesStore();

export {salesStore};

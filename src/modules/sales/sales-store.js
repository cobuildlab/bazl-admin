import Flux from 'flux-state';


export const SALE_EVENT = "SALE_EVENT";
export const SALE_ERROR = "SALE_ERROR";
export const SALE_STAT = "SALE_STAT";
export const SALE_CLOSED = "SALE_CLOSED";



class SalesStore extends Flux.DashStore{
    constructor(){
        super();
        this.addEvent(SALE_EVENT);
        this.addEvent(SALE_ERROR);
        this.addEvent(SALE_STAT);
        this.addEvent(SALE_CLOSED);

    }
}

const salesStore = new SalesStore();

export {salesStore};

import firebase from 'firebase';
import {
    SALE_EVENT,
    SALE_ERROR,
    SALE_STAT,
    SALE_CLOSED
} from './sales-store';
import Flux from 'react-flux-state';


export const fetchSales = async (productID) => {
    console.log(productID);
    const DB = firebase.firestore();
    const salesCollection = await DB.collection('sales');

    const productRef = await salesCollection.doc(productID);
    let query;
    try{
        query = await productRef.get({source: 'server'});
    }catch(e){
        Flux.dispatchEvent(SALE_ERROR, new Error(e));
        console.log(e);
        throw e;
    }
    if (!query.exists) return null;

    const sale = query.data();
    console.log(sale);

    Flux.dispatchEvent(SALE_EVENT, sale);


}
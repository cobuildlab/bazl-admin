import firebase from 'firebase';
import {
    SALE_EVENT,
    SALE_ERROR,
    SALE_STAT,
    SALE_CLOSED
} from './sales-store';
import Flux from 'flux-state';


export const fetchSales = async () => {
    const DB = firebase.firestore();
    const salesCollection = await DB.collection('sales');

    let data = [];
    let allSales = salesCollection.get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                data = doc.data();
                data.id = doc.id;
            });
            console.log(data);
            Flux.dispatchEvent(SALE_EVENT, data);
        })
        .catch(e => {
            console.log('Error getting documents', e);
            Flux.dispatchEvent(SALE_ERROR, new Error(e));
        });












    // const productRef = await salesCollection.doc();
    // let query;
    // try{
    //     query = await productRef.get({source: 'server'});
    // }catch(e){
    //     Flux.dispatchEvent(SALE_ERROR, new Error(e));
    //     console.log(e);
    //     throw e;
    // }
    // if (!query.exists) return null;

    // const sale = query.data();
    // console.log(sale);

    // Flux.dispatchEvent(SALE_EVENT, sale);


}
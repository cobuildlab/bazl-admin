import firebase from 'firebase';
import {
    SALE_EVENT,
    SALE_ERROR,
    SALE_STAT,
    SALE_CLOSED
} from './sales-store';
import Flux from 'flux-state';


export const fetchSales =  () => {
    const DB = firebase.firestore();
    const salesCollection =  DB.collection('sales');

    let data = [];
    let allSales = salesCollection.get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                data = doc.data();
                data.id = doc.id;
            });
            Flux.dispatchEvent(SALE_EVENT, data);
        })
        .catch(e => {
            console.log('Error getting documents', e);
            Flux.dispatchEvent(SALE_ERROR, new Error(e));
        });
}
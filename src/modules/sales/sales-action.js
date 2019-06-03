import firebase from 'firebase';
import {
    SALE_EVENT,
    SALE_ERROR,
    DETAIL_EVENT,
    DETAIL_ERROR,
    STAT_EVENT,
    STAT_ERROR
} from './sales-store';
import Flux from 'flux-state';


export const fetchSales =  () => {
    const DB = firebase.firestore();
    const salesCollection =  DB.collection('sales');

    let data = [];
     salesCollection.get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                const { buyerID, color, date, influencer, nOrder, 
                    picture, price,quantity,size,status,productID} = doc.data();
            data.push({
                saleID : doc.id,
                buyerID, 
                color, 
                date, 
                influencer, 
                nOrder, 
                picture, 
                price, 
                quantity, 
                size, 
                status, 
                productID
             })
            });
            Flux.dispatchEvent(SALE_EVENT, data);
        })
        .catch(e => {
            console.log('Error getting documents', e);
            Flux.dispatchEvent(SALE_ERROR, new Error(e));
        });
}

export const detailFetch =  (id) =>{
    const DB = firebase.firestore();
    const salesCollection =  DB.collection('sales').doc(id);

    let data = [];
     salesCollection.get()
    .then((doc)=>{
        if(doc.exists){
            data = doc.data();
            data.id = doc.id;
            Flux.dispatchEvent(DETAIL_EVENT, data);
        }else{
            console.log("No such Document");
            Flux.dispatchEvent(DETAIL_ERROR, data);
        }


    })
}

export const changeStatus = (id) =>{
    const DB = firebase.firestore();
    const salesCollection = DB.collection('sales').doc(id);

    let data = [];
        salesCollection.update({
            status : false
           
           

    })
    salesCollection.get()
        .then((doc) => {
            
            if (doc.exists) {
                data = doc.data();
                data.id = doc.id;
                Flux.dispatchEvent(STAT_EVENT, data);
            } else {
                console.log("No such Document");
                Flux.dispatchEvent(STAT_ERROR, data);
            }


        })
};



import firebase from 'firebase';
import {
    SALE_EVENT,
    SALE_ERROR,
    DETAIL_EVENT,
    DETAIL_ERROR,
    STAT_EVENT,
    STAT_ERROR,
    RECEIPT_EVENT,
    RECEIPT_ERROR
    
} from './sales-store';
import Flux from 'flux-state';

/**
 * Get all the sales
 * @returns {Promise<SalesModel>}Sale info or null if unexisting
 */
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
        // var storage = firebase.storage();
        // var storageRef = storage.ref();
        // var imagesRef = storageRef.child('receipts');

}

/**
 * Get detailed info of an specific Sale
 * @returns {Promise<SalesModel>}Sale info or null if unexisting
 */
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

/**
 * Update the State of a Sale to closed and get the modified data
 * @returns {Promise<SalesModel>}Sale info or null if unexisting
 */
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


export const receiptUpdate = (id, image) => {

    const DB = firebase.firestore();
    const salesCollection = DB.collection('sales').doc(id);
    const storageRef = firebase.storage().ref(`/receipts/${image.name}`);
    const task = storageRef.put(image);
    let data = [];

    task.on('state_changed', snapshot =>{
        console.log("Image Successfully Uploaded");

    }, error => { 
        console.log("error", error.message);
        }, () => {
            task.snapshot.ref.getDownloadURL().then((downloadURL) =>{     
        
                salesCollection.update({
            receiptPic: downloadURL
          
        });
    });
}
    )
    
    salesCollection.get()
        .then((doc) => {
            if (doc.exists) {
                data = doc.data();
                data.id = doc.id;
                Flux.dispatchEvent(RECEIPT_EVENT, data);
            } else {
                console.log("No such Document");
                Flux.dispatchEvent(RECEIPT_ERROR, data);
            }
        })
    }

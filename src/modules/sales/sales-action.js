import firebase from 'firebase';
import {
  SALE_EVENT,
  SALE_ERROR,
  DETAIL_EVENT,
  DETAIL_ERROR,
  STAT_EVENT,
  STAT_ERROR,
  UPLOAD_EVENT,
  UPLOAD_ERROR,
} from './sales-store';
import Flux from 'flux-state';

/**
 * Get all the sales
 * @returns {Promise<SalesModel>}Sale info or null if unexisting
 */
export const fetchSales = () => {
  const DB = firebase.firestore();
  const salesCollection = DB.collection('sales');

  let data = [];
  salesCollection
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        const {
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
          shippedStatus,
          productID,
          statusShipped,
        } = doc.data();
        data.push({
          saleID: doc.id,
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
          shippedStatus,
          productID,
          statusShipped,
        });
      });
      Flux.dispatchEvent(SALE_EVENT, data);
    })
    .catch((e) => {
      console.log('Error getting documents', e);
      Flux.dispatchEvent(SALE_ERROR, new Error(e));
    });
};

/**
 * Get detailed info of an specific Sale
 * @returns {Promise<SalesModel>}Sale info or null if unexisting
 */
export const detailFetch = (id) => {
  const DB = firebase.firestore();
  const salesCollection = DB.collection('sales').doc(id);

  let data = [];
  salesCollection.get().then((doc) => {
    if (doc.exists) {
      data = doc.data();
      data.id = doc.id;
      Flux.dispatchEvent(DETAIL_EVENT, data);

      //update test
      //   salesCollection.set({
      //     // status: false,
      //     user: 'mau',
      //     nOrder: '000122226',
      //     buyerID: '@maurbina',
      //     influencer: '@maurbina'
      // }, { merge: true });
    } else {
      console.log('No such Document');
      Flux.dispatchEvent(DETAIL_ERROR, data);
    }
  });
};

/**
 * Get url of an specific Receipt
 * Sale info or null if unexisting
 */

export const detailUpload = async (e) => {
  const image = e.target.files[0];
  let imageURL = null;
  const storage = firebase.storage();
  if (image) {
    const storageRef = storage.ref(`/receipts/${image.name}`);
    const task = await storageRef.put(image);
    imageURL = await task.ref.getDownloadURL();
    Flux.dispatchEvent(UPLOAD_EVENT, imageURL);

    //Add sale with code
    // const DB = firebase.firestore();
    // const productCollection = DB.collection('sales');
    // await productCollection.add({
    //   name: 'Sophie',
    //   category: 'service',
    //   description : 'description',
    //   size : '10',
    //   quantity :'3',
    //   color: 'blue',
    //   price: "300$",
    //   commission: "5$",
    //   additionalFee : "10$",
    //   shippingFee :"50",
    //   totalPrice:"305$",
    //   user:"@maurbina",
    //   nOrden: '',
    //   shippedStatus : '1',
    //   status: true
    // }).then(doc => {
    //   console.log("agregado");
    //   console.log('statusShipped added: ', doc);
    //   Flux.dispatchEvent(PRODUCT_EVENT, doc)
    // }).catch(e => {
    //   console.log('Error Adding document: ', e);
    // })
  } else {
    console.log('No such Document');
    Flux.dispatchEvent(UPLOAD_ERROR, imageURL);
  }

  // } else {
  //   console.log('No such Document');
  //   Flux.dispatchEvent(UPLOAD_ERROR, imageURL);
  // }
};

/**
 * Update the State of a Sale to closed and get the modified data
 * @returns {Promise<SalesModel>}Sale info or null if unexisting
 */
export const changeStatus = (id, e) => {
  const DB = firebase.firestore();
  const salesCollection = DB.collection('sales').doc(id);

  let data = [];
  if (e === '2') {
    salesCollection.update({
      shippedStatus: '2',
    });
  } else {
    salesCollection.update({
      status: false,
    });
  }

  salesCollection.get().then((doc) => {
    if (doc.exists) {
      data = doc.data();
      data.id = doc.id;
      Flux.dispatchEvent(STAT_EVENT, data);
    } else {
      console.log('No such Document');
      Flux.dispatchEvent(STAT_ERROR, data);
    }
  });
};

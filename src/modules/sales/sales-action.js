import firebase from 'firebase';
import {
  SALE_EVENT,
  SALE_ERROR,
  DETAIL_EVENT,
  DETAIL_ERROR,
  COMMENT_EVENT,
  COMMENT_ERROR,
  STAT_EVENT,
  STAT_ERROR,
  UPLOAD_EVENT,
  UPLOAD_ERROR,
} from './sales-store';
import { landingStore, USER_EVENT } from '../landing/landing-store';

import Flux from 'flux-state';

/**
 * Get all the sales
 * @returns {Promise<SalesModel>}Sale info or null if unexisting
 */
export const fetchSales = () => {
  const DB = firebase.firestore();
  const salesCollection = DB.collection('orders');
  const userData = landingStore.getState(USER_EVENT);

  let data = [];
  salesCollection
    .where('userEmail', '==', userData.email)
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        const {
          controlNumber,
          orderDate,
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
          totalAmount,
          shippingFee,
        } = doc.data();
        data.push({
          saleID: doc.id,
          controlNumber,
          orderDate,
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
          totalAmount,
          shippingFee,
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
  const salesCollection = DB.collection('orders').doc(id);

  let data = [];
  salesCollection.get().then((doc) => {
    if (doc.exists) {
      data = doc.data();
      data.id = doc.id;
      Flux.dispatchEvent(DETAIL_EVENT, data);
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
  } else {
    console.log('No such Document');
    Flux.dispatchEvent(UPLOAD_ERROR, imageURL);
  }
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

/**
 * Update the State of a Sale to closed and get the modified data
 * @returns {Promise<SalesModel>}Sale info or null if unexisting
 */
export const updateCommentAction = async (messageData, i) => {
  console.log('messageData', messageData);
  const DB = firebase.firestore();
  const ordersCollection = DB.collection('orders');
  const sessionOrder = landingStore.getState(USER_EVENT);
  let orders;

  await ordersCollection
    .where('userEmail', '==', sessionOrder.email)
    .get()
    .then((data) => {
      data.forEach((doc) => {
        orders = doc;
      });
    })
    .catch((e) => {
      Flux.dispatchEvent(COMMENT_ERROR, new Error(e));
      console.log(e);
    });

  const ordersRef = ordersCollection.doc(orders.id);

  let ordersData = orders.data();
  let { products } = ordersData;
  console.log('products', products);
  products[i].comment = messageData.comment;
  products[i].pictureTax = messageData.pictureTax;
  await ordersRef.set(ordersData, { merge: true });

  Flux.dispatchEvent(COMMENT_EVENT, messageData);
};

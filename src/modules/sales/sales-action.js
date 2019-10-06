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
  IMG_EVENT,
  IMG_EVENT_SALE,
} from './sales-store';
import { landingStore, USER_EVENT } from '../landing/landing-store';

import Flux from 'flux-state';

/**
 * Get all the sales
 * @returns {Promise<SalesModel>}Sale info or null if unexisting
 */
export const fetchSales = () => {
  const DB = firebase.firestore();
  const salesCollection = DB.collection('sales');
  const userData = landingStore.getState(USER_EVENT);

  let data = [];
  salesCollection
    .where('saleMerchantEmail', '==', userData.email)
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        const {
          buyerEmail,
          id,
          orderAddress,
          orderControlNumber,
          orderDate,
          orderId,
          orderStatus,
          orderTotalAmount,
          products,
          saleMerchantEmail,
        } = doc.data();
        data.push({
          buyerEmail,
          id,
          orderAddress,
          orderControlNumber,
          orderDate,
          orderId,
          orderStatus,
          orderTotalAmount,
          products,
          saleMerchantEmail,
          // saleID: doc.id,
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
export const updateCommentAction = async (data, index) => {
  const ref = data;
  const DB = firebase.firestore();
  const salesRef = DB.collection('sales').doc(ref.id);
  let sale;
  let orderId;
  await salesRef
    .get()
    .then((data) => {
      sale = data.data();
      orderId = sale.orderId;
    })
    .catch((e) => {
      Flux.dispatchEvent(COMMENT_ERROR, new Error(e));
      console.log(e);
    });

  sale.products[index].comment = ref.products[index].comment;
  if (ref.products[index].pictureTax) {
    sale.products[index].pictureTax = ref.products[index].pictureTax;
  }
  if (sale.products[index].comment && sale.products[index].pictureTax) {
    sale.orderStatus = 'shipped';
  }

  const ordersRef = DB.collection('orders').doc(orderId);
  const orderData = await ordersRef.get();
  const order = orderData.data();

  await order.products.forEach((product) => {
    if (product.id === ref.idProduct) {
      if (ref.comment) {
        product.comment = ref.comment;
        product.orderStatus = sale.orderStatus;
      }
    }
  });

  const influencerCollection = DB.collection('influencersSalesProducts');
  let influencer;
  let idInfluencer;

  await influencerCollection
    .where('saleId', '==', ref.id)
    .get()
    .then((data) => {
      data.forEach((doc) => {
        idInfluencer = doc.id;
        influencer = doc.data();
        if (ref.comment) {
          influencer.comment = ref.comment;
          influencer.orderStatus = sale.orderStatus;
        }
      });
    })
    .catch((e) => {
      Flux.dispatchEvent(COMMENT_ERROR, new Error(e));
      console.log(e);
    });

  const influencerRef = DB.collection('influencersSalesProducts').doc(
    idInfluencer,
  );

  await salesRef.set(sale, { merge: true });
  await ordersRef.set(order, { merge: true });
  await influencerRef.set(influencer, { merge: true });

  Flux.dispatchEvent(COMMENT_EVENT, data);
};

/**
 * Update the State of a Sale to closed and get the modified data
 * @returns {Promise<SalesModel>}Sale info or null if unexisting
 */
export const fetchImgUserProduct = async (user) => {
  const DB = firebase.firestore();
  const userRef = DB.collection('users').doc(user);
  let img;

  await userRef
    .get()
    .then((data) => {
      img = data.data().picture;
    })
    .catch((e) => {
      Flux.dispatchEvent(COMMENT_ERROR, new Error(e));
      console.log(e);
    });

  Flux.dispatchEvent(IMG_EVENT, img);
};

/**
 * Update the State of a Sale to closed and get the modified data
 * @returns {Promise<SalesModel>}Sale info or null if unexisting
 */
export const fetchSalesImg = async (sales) => {
  const DB = firebase.firestore();

  await sales.forEach((element) => {
    const userRef = DB.collection('users').doc(element.buyerEmail);
    userRef
      .get()
      .then((data) => {
        element.buyerImg = data.data().picture;
      })
      .catch((e) => {
        Flux.dispatchEvent(COMMENT_ERROR, new Error(e));
        console.log(e);
      });
  });

  Flux.dispatchEvent(IMG_EVENT_SALE, sales);
};

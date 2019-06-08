import firebase from 'firebase'
import Flux from 'flux-state';
import {INVENTORY_EVENT, INVENTORY_ERROR_EVENT,INVENTORY_DETAIL_EVENT, INVENTORY_DETAIL_ERROR} from './inventory-store';
/**
 * fetches the products belonging to the user
 * @param {string} email the user's email
 * @returns {Promise<{userProducts}>}
 */
export const fetchUserProducts = () => {
  const DB = firebase.firestore();
  const productsCollection = DB.collection('products');

  let data = [];
  productsCollection.get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        const { picture,
          name,
          category,
          description,
          size,
          quantity,
          color,
          price,
          commission,
          additionalFee,
          shippingFee,
          totalPrice } = doc.data();
        data.push({
          picture,
          name,
          category,
          description,
          size,
          quantity,
          color,
          price,
          commission,
          additionalFee,
          shippingFee,
          totalPrice,
          productID: doc.id
        })
      });
      console.log(data);
      Flux.dispatchEvent(INVENTORY_EVENT, data);
    })
    .catch(e => {
      console.log('Error getting documents', e);
      Flux.dispatchEvent(INVENTORY_ERROR_EVENT, new Error(e));
    });
}

export const fetchDetailProduct = (id) =>{
  const DB = firebase.firestore();
  const productsCollection = DB.collection('products').doc(id);

  let data = [];
  productsCollection.get()
    .then((doc) => {
      if (doc.exists) {
        data = doc.data();
        data.id = doc.id;
        Flux.dispatchEvent(INVENTORY_DETAIL_EVENT, data);
      } else {
        console.log("No such Document");
        Flux.dispatchEvent(INVENTORY_DETAIL_ERROR, data);
      }


    })
}

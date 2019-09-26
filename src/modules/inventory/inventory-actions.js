import firebase from 'firebase';
import Flux from 'flux-state';
import {
  INVENTORY_EVENT,
  INVENTORY_ERROR_EVENT,
  INVENTORY_DETAIL_EVENT,
  INVENTORY_UPDATE_EVENT,
  INVENTORY_DELETE_EVENT,
  SEARCH_EVENT,
} from './inventory-store';
import { landingStore, USER_EVENT } from '../landing/landing-store';
/**
 * fetches the products belonging to the user
 *
 * @returns {Promise<{userProducts}>}
 */
export const fetchUserProducts = () => {
  const DB = firebase.firestore();
  const productsCollection = DB.collection('products');
  const userData = landingStore.getState(USER_EVENT);

  let data = [];
  productsCollection
    .where('user', '==', userData.email)
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        const {
          picture,
          name,
          category,
          description,
          products,
          price,
          additionalFee,
          shippingFee,
          totalQuantity,
          views,
          user,
        } = doc.data();
        data.push({
          picture,
          name,
          category,
          description,
          products,
          price,
          additionalFee,
          shippingFee,
          totalQuantity,
          views,
          user,
          productID: doc.id,
        });
      });
      console.log(data);
      Flux.dispatchEvent(INVENTORY_EVENT, data);
    })
    .catch((e) => {
      console.log('Error getting documents', e);
      Flux.dispatchEvent(INVENTORY_ERROR_EVENT, new Error(e));
    });
};

export const searchProduct = async (search) => {
  const DB = firebase.firestore();
  const productsCollection = DB.collection('products');
  const userData = landingStore.getState(USER_EVENT);
  const nameSearch = await search;

  let data = [];
  await productsCollection
    .where('user', '==', userData.email)
    .where('name', '==', nameSearch)
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        const {
          picture,
          name,
          category,
          description,
          products,
          price,
          additionalFee,
          shippingFee,
          // totalPrice,
          totalQuantity,
          user,
        } = doc.data();
        data.push({
          picture,
          name,
          category,
          description,
          products,
          price,
          additionalFee,
          shippingFee,
          // totalPrice,
          totalQuantity,
          user,
          productID: doc.id,
        });
      });
      console.log(data, 'data');
      Flux.dispatchEvent(SEARCH_EVENT, data);
    })
    .catch((e) => {
      console.log('Error getting documents', e);
      Flux.dispatchEvent(INVENTORY_ERROR_EVENT, new Error(e));
    });
};
/**
 * fetches all the info of a determinated product
 *
 * @returns {Promise<{userProducts}>}
 */
export const fetchDetailProduct = (id) => {
  const DB = firebase.firestore();
  const productsCollection = DB.collection('products').doc(id);

  let data = [];
  productsCollection.get().then((doc) => {
    if (doc.exists) {
      data = doc.data();
      data.id = doc.id;
      Flux.dispatchEvent(INVENTORY_DETAIL_EVENT, data);
    } else {
      console.log('No such Document');
      Flux.dispatchEvent(INVENTORY_ERROR_EVENT, data);
    }
  });
};
/**
 * Update the info of a product
 *
 * @returns {Promise<{userProducts}>}
 */
export const updateProduct = async (product, image, quantity, id) => {
  const DB = firebase.firestore();
  const productCollection = DB.collection('products').doc(id);
  const settingsCollection = DB.collection('settings');
  let settingsRef;
  let settings = {};
  let imageURL = product.picture;
  const storage = firebase.storage();

  try {
    settingsRef = await settingsCollection.get();
  } catch (err) {
    Flux.dispatch(INVENTORY_ERROR_EVENT, err);
  }

  settingsRef.forEach((doc) => {
    settings = doc.data();
  });

  if (image) {
    const storageRef = storage.ref(`/productImages/${image.name}`);
    const task = await storageRef.put(image);
    imageURL = await task.ref.getDownloadURL();
  }
  const {
    name,
    category,
    description,
    products,
    price,
    additionalFee,
    shippingFee,
    user,
  } = product;

  let bazlGain = (settings.bazlFee / 100) * price;
  let influencerGain =
    ((settings.influencerFee + parseFloat(additionalFee)) / 100) * price;
  let finalPrice = price - (bazlGain + influencerGain);

  productCollection
    .update({
      picture: imageURL,
      name,
      category,
      description,
      products,
      price,
      additionalFee,
      shippingFee,
      totalQuantity: quantity,
      user,
      bazlGain,
      influencerGain,
      finalPrice,
    })
    .then((doc) => {
      Flux.dispatchEvent(INVENTORY_UPDATE_EVENT, doc);
    })
    .catch((e) => {
      console.log('Error Updating document: ', e);
      Flux.dispatchEvent(INVENTORY_ERROR_EVENT, e);
    });
};

/**
 * Delete a determinated Product
 *
 * @returns {Promise<{userProducts}>}
 */
export const deleteProduct = (id) => {
  const DB = firebase.firestore();
  const productCollection = DB.collection('products').doc(id);

  productCollection
    .delete()
    .then((doc) => {
      Flux.dispatchEvent(INVENTORY_DELETE_EVENT, doc);
    })
    .catch((e) => {
      console.log('Error deleting document: ', e);
      Flux.dispatchEvent(INVENTORY_ERROR_EVENT, e);
    });
};

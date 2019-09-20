import firebase from 'firebase';
import Flux from 'flux-state';
import {
  PRODUCT_EVENT,
  PRODUCT_ERROR_EVENT,
  IMPORT_EVENT,
  PRODUCT_CATEGORIES_EVENT,
} from './newproduct-store';
import { landingStore, USER_EVENT } from '../landing/landing-store';

/**
 * get all category
 * @param {string} firebaseUser the firebase uid
 * @returns {Promise<ProductModel>} product info or null if unexisting
 */

export const getCategory = async () => {
  const DB = firebase.firestore();
  const categoryRef = DB.collection('categories');

  let categoryCollection;
  let categories = [];

  try {
    categoryCollection = await categoryRef.get();
  } catch (err) {
    Flux.dispatch(PRODUCT_ERROR_EVENT, err);
  }

  categoryCollection.forEach((doc) => {
    categories.push(doc.data());
  });

  Flux.dispatchEvent(PRODUCT_CATEGORIES_EVENT, categories);
};

/**
 * creates a new product belonging to the user
 * @param {string} firebaseUser the firebase uid
 * @returns {Promise<ProductModel>} product info or null if unexisting
 */

export const createProduct = async (product, image, quantity) => {
  const DB = firebase.firestore();
  const productCollection = DB.collection('products');
  const settingsCollection = DB.collection('settings');
  let settingsRef;
  let settings = {};
  let imageURL = null;
  const storage = firebase.storage();
  const userData = landingStore.getState(USER_EVENT);

  try {
    settingsRef = await settingsCollection.get();
  } catch (err) {
    Flux.dispatch(PRODUCT_ERROR_EVENT, err);
  }

  settingsRef.forEach((doc) => {
    settings = doc.data();
  });

  console.log('settings', settings);

  if (image) {
    const storageRef = storage.ref(`/productImages/${image.name}`);
    const task = await storageRef.put(image);
    imageURL = await task.ref.getDownloadURL();
  }

  let {
    name,
    category,
    description,
    price,
    products,
    additionalFee,
    shippingFee,
  } = product;
  console.log('product', product);
  let bazlGain = (settings.bazlFee / 100) * price;
  let influencerGain = settings.influencerFee + (additionalFee / 100) * price;
  await productCollection
    .add({
      picture: imageURL,
      user: userData.email,
      totalQuantity: quantity,
      name,
      category,
      description,
      price,
      products,
      additionalFee,
      shippingFee,
      bazlGain,
      influencerGain,
    })
    .then((doc) => {
      console.log('Document writen with ID: ', doc.id);
      Flux.dispatchEvent(PRODUCT_EVENT, doc);
    })
    .catch((e) => {
      console.log('Error Adding document: ', e);
      Flux.dispatchEvent(PRODUCT_ERROR_EVENT, e);
    });
};

/**
 * creates a list of products belonging to the user imported via csv
 * @param {string} firebaseUser the firebase uid
 * @returns {Promise<ProductModel>} product info or null if unexisting
 */

export const uploadData = async (data) => {
  const DB = firebase.firestore();
  const productCollection = DB.collection('products');
  const settingsCollection = DB.collection('settings');
  let settingsRef;
  let settings = {};
  const userData = landingStore.getState(USER_EVENT);
  let idProducts;

  try {
    settingsRef = await settingsCollection.get();
  } catch (err) {
    Flux.dispatch(PRODUCT_ERROR_EVENT, err);
  }

  settingsRef.forEach((doc) => {
    settings = doc.data();
  });

  data.forEach((product) => {
    const {
      name,
      category,
      description,
      products,
      price,
      additionalFee,
      shippingFee,
    } = product;
    let imageUrl = null;
    if (product.imageUrl !== '') {
      imageUrl = product.imageUrl;
    }

    let bazlGain = (settings.bazlFee / 100) * price;
    let influencerGain = settings.influencerFee + (additionalFee / 100) * price;

    productCollection
      .add({
        picture: imageUrl,
        name,
        category,
        description,
        products,
        price,
        additionalFee,
        shippingFee,
        bazlGain,
        influencerGain,
        user: userData.email,
      })
      .then((doc) => {
        console.log('Document writen with ID: ', doc.id);
        idProducts = doc.id;
      })
      .catch((e) => {
        Flux.dispatchEvent(PRODUCT_ERROR_EVENT, e);
      });

    Flux.dispatchEvent(IMPORT_EVENT, { idProducts });
  });
};

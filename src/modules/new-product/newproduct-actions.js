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
  let imageURL = null;
  const storage = firebase.storage();
  const userData = landingStore.getState(USER_EVENT);

  if (image) {
    const storageRef = storage.ref(`/productImages/${image.name}`);
    const task = await storageRef.put(image);
    imageURL = await task.ref.getDownloadURL();
  }

  const {
    name,
    category,
    description,
    price,
    commission,
    additionalFee,
    shippingFee,
    totalPrice,
    products,
  } = product;

  await productCollection
    .add({
      picture: imageURL,
      name,
      category,
      description,
      price,
      commission,
      additionalFee,
      shippingFee,
      totalPrice,
      products,
      totalQuantity: quantity,
      user: userData.email,
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

export const uploadData = (data) => {
  const DB = firebase.firestore();
  const productCollection = DB.collection('products');
  const userData = landingStore.getState(USER_EVENT);
  let idProducts;

  data.forEach((product) => {
    const {
      name,
      category,
      description,
      products,
      price,
      commission,
      additionalFee,
      shippingFee,
    } = product;
    let imageUrl = null;
    if (product.imageUrl !== '') {
      imageUrl = product.imageUrl;
    }
    productCollection
      .add({
        picture: imageUrl,
        name,
        category,
        description,
        products,
        price,
        commission,
        additionalFee,
        shippingFee,
        totalPrice: '',
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

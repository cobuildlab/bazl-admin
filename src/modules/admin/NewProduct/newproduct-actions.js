import firebase from 'firebase';
import { 
  PRODUCT_EVENT,
  PRODUCT_ERROR_EVENT 
} from './newproduct-store';
import { productModel } from './newproduct-models';
import { landingStore, USER_EVENT } from '../../landing/landing-store';
import Flux from 'react-flux-state';
import * as R from 'ramda'


/**
 * creates a new product belonging to the user
 * @param {string} firebaseUser the firebase uid
 * @returns {Promise<ProductModel>} product info or null if unexisting
 */

export const createProduct = async (data) => {
  const DB = firebase.firestore();
  const productCollection = DB.collection('products')
  const user = landingStore.getState(USER_EVENT)


  const product = R.clone(productModel);
  product.picture = data.picture
  product.name = data.name
  product.category = data.category
  product.description = data.description
  product.size = data.size
  product.quantity = data.quantity
  product.color = data.color
  product.newColor = data.newColor
  product.price = data.price
  product.commision = data.commision 
  product.additionalFee = data.additionalFee
  product.shippingFee = data.shippingFee
  product.userId = user.email


  const productRef = productCollection.doc(data.name)
  try{
    await productRef.set(product, {merge: true})
  } catch {
    Flux.dispatchEvent(PRODUCT_ERROR_EVENT, product);
  }
  Flux.dispatchEvent(PRODUCT_EVENT, product)
  console.log(product)
  return product
}
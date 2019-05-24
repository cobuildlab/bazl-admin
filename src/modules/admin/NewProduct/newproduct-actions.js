import firebase from 'firebase';
import { 
  PRODUCT_EVENT,
  PRODUCT_ERROR_EVENT 
} from './newproduct-store';
import { landingStore, USER_EVENT } from '../../landing/landing-store';
import Flux from 'react-flux-state';


/**
 * creates a new product belonging to the user
 * @param {string} firebaseUser the firebase uid
 * @returns {Promise<ProductModel>} product info or null if unexisting
 */

export const createProduct = async ({ 
  picture,
  name,
  category,
  size,
  quantity,
  color,
  newColor,
  price,
  commission,
  additionalFee,
}) => {
  const DB = firebase.firestore();
  const productCollection = DB.collection('products')
  const user = landingStore.getState(USER_EVENT)


  const product = {
    picture,
    name,
    category,
    size,
    quantity,
    color,
    newColor,
    price,
    commission,
    additionalFee,
    userId: user.email
  };

  



  const productRef = productCollection.doc(name)
  try{
    await productRef.set(product, {merge: true})
  } catch {
    Flux.dispatchEvent(PRODUCT_ERROR_EVENT, product);
  }
  Flux.dispatchEvent(PRODUCT_EVENT, product)
  console.log(product)
  return product
}
import firebase from 'firebase';
import Flux from 'flux-state';
import { PRODUCT_EVENT, PRODUCT_ERROR_EVENT } from './newproduct-store';
import {landingStore, USER_EVENT} from '../landing/landing-store';
/**
 * creates a new product belonging to the user
 * @param {string} firebaseUser the firebase uid
 * @returns {Promise<ProductModel>} product info or null if unexisting
 */

export const createProduct = async (product, image)  => {
    const DB = firebase.firestore();
    const productCollection = DB.collection('products');
    let imageURL =null;
    const storage = firebase.storage();
    const userData = landingStore.getState(USER_EVENT);
    const userEmail= userData.email;;
    console.log(userEmail);
    if(image){
      const storageRef = storage.ref(`/productImages/${image.name}`);
      const task = await storageRef.put(image);
     imageURL = await task.ref.getDownloadURL();
    }

      const {
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
      user } = product;  

       await productCollection.add({
       picture: imageURL,
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
          user: userEmail
       }).then(doc => {
         console.log("Document writen with ID: ", doc.id);
             Flux.dispatchEvent(PRODUCT_EVENT, doc)
           }).catch(e => {
             console.log("Error Adding document: ", e);
             Flux.dispatchEvent(PRODUCT_ERROR_EVENT, e);
           })
       }

      
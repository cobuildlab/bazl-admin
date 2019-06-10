import firebase from 'firebase';
import Flux from 'flux-state';
import { PRODUCT_EVENT, PRODUCT_ERROR_EVENT } from './newproduct-store';
/**
 * creates a new product belonging to the user
 * @param {string} firebaseUser the firebase uid
 * @returns {Promise<ProductModel>} product info or null if unexisting
 */

export const createProduct = async (product, image)  => {
  if(image != null){
    const DB = firebase.firestore();
    const storage = firebase.storage();
    const storageRef = storage.ref(`/productImages/${image.name}`);
  const productCollection = DB.collection('products');
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
    totalPrice } = product;
    const task = storageRef.put(image);

    task.on('state_changed', snapshot=>{
      console.log('image Successfully Uploaded');
  },error =>{
    console.log("error", error.message);
  }, () =>{
    task.snapshot.ref.getDownloadURL().then((downloadURL) =>{
      
      productCollection.add({
        picture : downloadURL,
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
        totalPrice
      }).then( doc =>{
        console.log("Document writen with ID: ", doc.id);
        Flux.dispatchEvent(PRODUCT_EVENT, doc)
      }).catch( e =>{
        console.log("Error Adding document: ", e);
        Flux.dispatchEvent(PRODUCT_ERROR_EVENT,e);
      })
    })
    
  } )
}else{
    const DB = firebase.firestore();
    const productCollection = DB.collection('products');
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
      totalPrice } = product;

        productCollection.add({
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
          totalPrice
        }).then(doc => {
          console.log("Document writen with ID: ", doc.id);
          Flux.dispatchEvent(PRODUCT_EVENT, doc)
        }).catch(e => {
          console.log("Error Adding document: ", e);
          Flux.dispatchEvent(PRODUCT_ERROR_EVENT, e);
        })
}
 }
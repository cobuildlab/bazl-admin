import firebase from 'firebase'
import Flux from 'flux-state';
import {INVENTORY_EVENT, INVENTORY_ERROR_EVENT,INVENTORY_DETAIL_EVENT,
  INVENTORY_UPDATE_EVENT,
  INVENTORY_DELETE_EVENT} from './inventory-store';
/**
 * fetches the products belonging to the user
 * 
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
/**
 * fetches all the info of a determinated product
 *
 * @returns {Promise<{userProducts}>}
 */
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
        Flux.dispatchEvent(INVENTORY_ERROR_EVENT, data);
      }


    })
}
/**
 * Update the info of a product
 * 
 * @returns {Promise<{userProducts}>}
 */
export const updateProduct = async (product, image, id) =>{
  const DB = firebase.firestore();
  const productCollection = DB.collection('products').doc(id);
  let imageURL = null;
  const storage = firebase.storage();
  if (image) {
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
  totalPrice } = product;
  
        productCollection.update({
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
          totalPrice
        }).then(doc => {
          Flux.dispatchEvent(INVENTORY_UPDATE_EVENT, doc)
        }).catch(e => {
          console.log("Error Updating document: ", e);
          Flux.dispatchEvent(INVENTORY_ERROR_EVENT, e);
        })
  
    }
    
    /**
 * Delete a determinated Product
 * 
 * @returns {Promise<{userProducts}>}
 */
export const deleteProduct = (id) => {
  const DB = firebase.firestore();
  const productCollection = DB.collection('products').doc(id);

  productCollection.delete()
    .then((doc) => {
      Flux.dispatchEvent(INVENTORY_DELETE_EVENT, doc)
    }).catch(e => {
      console.log("Error deleting document: ", e);
      Flux.dispatchEvent(INVENTORY_ERROR_EVENT, e);
    })
}
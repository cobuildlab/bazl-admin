import firebase from 'firebase'
import Flux from 'flux-state';
import {INVENTORY_EVENT, INVENTORY_ERROR_EVENT,INVENTORY_DETAIL_EVENT,
   INVENTORY_DETAIL_ERROR, INVENTORY_UPDATE_EVENT, INVENTORY_UPDATE_ERROR,
  INVENTORY_DELETE_EVENT, INVENTORY_DELETE_ERROR} from './inventory-store';
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

export const updateProduct = (product, image, id) =>{
  if (image != null) {
    const DB = firebase.firestore();
    const storage = firebase.storage();
    const storageRef = storage.ref(`/productImages/${image.name}`);
    const productCollection = DB.collection('products').doc(id);
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
    const task = storageRef.put(image);

    task.on('state_changed', () => {
      console.log('image Successfully Uploaded');
    }, error => {
      console.log("error", error.message);
    }, () => {
      task.snapshot.ref.getDownloadURL().then((downloadURL) => {

        productCollection.update({
          picture: downloadURL,
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
          Flux.dispatchEvent(INVENTORY_UPDATE_ERROR, e);
        })
      })

    })
  } else {
    const DB = firebase.firestore();
    const productCollection = DB.collection('products').doc(id);
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

    productCollection.update({
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
    }).then((doc) => {
      Flux.dispatchEvent(INVENTORY_UPDATE_EVENT, doc)
    }).catch(e => {
      console.log("Error updating document: ", e);
      Flux.dispatchEvent(INVENTORY_UPDATE_ERROR, e);
    })
  }

}

export const deleteProduct = (id) => {
  const DB = firebase.firestore();
  const productCollection = DB.collection('products').doc(id);

  productCollection.delete()
    .then((doc) => {
      Flux.dispatchEvent(INVENTORY_DELETE_EVENT, doc)
    }).catch(e => {
      console.log("Error deleting document: ", e);
      Flux.dispatchEvent(INVENTORY_DELETE_ERROR, e);
    })
}
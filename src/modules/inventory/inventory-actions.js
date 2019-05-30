import firebase from 'firebase'

/**f
 * fetches the products belonging to the user
 * @param {string} email the user's email
 * @returns {Promise<{userProducts}>}
 */
export const fetchUserProducts = () => {
  const DB = firebase.firestore();
  const productsCollection = DB.collection('products')
  

}

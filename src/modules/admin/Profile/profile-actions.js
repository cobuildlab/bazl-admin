import firebase from 'firebase';
import Flux from 'flux-state'
import { 
  landingStore,
  USER_EVENT, 
  USER_ERROR_EVENT } from '../../landing/landing-store'
import { UPDATE_USER_EVENT } from './'
/**
 * Updates a User of the Platform
 * @param data a User data
 * @return {Promise<UserModel>} The data of the User or null if does not exist
 */
export const updateUser = async ({ data }) => {
  const DB = firebase.firestore();
  const usersCollection = DB.collection('users');
  const user = landingStore.getState(USER_EVENT);
  const userRef = usersCollection.doc(user.email);
  const update = { data };

  let downloadUrl = null;
  if (data.picture) {
    if (data.picture instanceof File === false) {
      const ERROR = new Error('Picture is not a File');
      Flux.dispatchEvent(USER_ERROR_EVENT, ERROR);
      throw ERROR;
    }
    const STORAGE = firebase.storage();
    const profilePictureName = user.email.replace(/[@.]/gi, '');
    const path = `profileImages/${profilePictureName}.${ext}`;
    const ref = STORAGE.ref().child(path);
    const r = await ref.put(data.picture);
    downloadUrl = await r.ref.getDownloadURL();
    update.picture = path;
  }
  await userRef.set(data, { merge: true });
  if (downloadUrl !== null) update.picture = downloadUrl;
  Flux.dispatchEvent(UPDATE_USER_EVENT, { ...user, ...update });
  return user;
};
import firebase from 'firebase';
import Flux from 'flux-state';
import { log, error } from 'pure-logger';
import { PROFILE_EVENT, UPDATE_USER_EVENT, PROFILE_ERROR_EVENT, ACCOUNT_ERROR_EVENT } from './profile-store';
// import { profileValidator } from './profile-validators';
import { landingStore, USER_EVENT } from "../landing/landing-store";
/**
 *
 * @param {ProfileModel} profileData
 * @return {Promise<ProfileModel>}
 */
export const updateProfileAction = async (profileData) => {
  log('updateProfileAction1', profileData);
  try {
    // profileValidator(profileData);
    log("profileValidator(profileData);")
  } catch (e) {
    error('updateProfileAction', e);
    return Flux.dispatchEvent(PROFILE_ERROR_EVENT, e);
  }

  const DB = firebase.firestore();
  const profilesCollection = DB.collection('users');
  const user = landingStore.getState(USER_EVENT);
  log('updateProfileAction:user', user);
  const profileRef = profilesCollection.doc(user.email);
  // logProfile(user.email, profileData, new Date().getTime());
  await profileRef.set(profileData, { merge: true });
  Flux.dispatchEvent(UPDATE_USER_EVENT, profileData);
  return profileData;
};

/**
 * Fetches a User Profile
 * @param email The email of the User
 * @return {Promise<ProfileModel>}
 */
export const fetchProfileAction = async (email = null) => {
  const DB = firebase.firestore();
  const profilesCollection = DB.collection('users');

  if (email === null) {
    const user = landingStore.getState(USER_EVENT);
    email = user.email;
  }
  log('fetchProfileAction:email', email);
  const profileRef = profilesCollection.doc(email.toLowerCase());
  const query = await profileRef.get();
  log('fetchProfileAction:query', query);
  let profileData = {};
  if (query.exists) {
    profileData = query.data();
  }
  Flux.dispatchEvent(PROFILE_EVENT, profileData);
  return profileData;
};

export const addAccountAction = async (accountData) => {
  log('addAccountAction', accountData);
  try {
    // profileValidator(accountData);
    log("addAccountAction(accountData);")
  } catch (e) {
    error('addAccountAction', e);
    return Flux.dispatchEvent(ACCOUNT_ERROR_EVENT, e);
  }

  const DB = firebase.firestore();
  const profilesCollection = DB.collection('users');

  const user = landingStore.getState(USER_EVENT);
  log('updateProfileAction:user', user);
  const profileRef = profilesCollection.doc(user.email);
  
  // profileRef.set({
  //   bankAccounts: { accountData }
  // }).then(function () {
  //   console.log("Document successfully updated!");
  // });

  await profileRef.set(accountData, { merge: true })
  Flux.dispatchEvent(UPDATE_USER_EVENT, accountData);
  return accountData;
}



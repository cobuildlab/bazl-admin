import firebase from 'firebase';
import Flux from 'flux-state';
import * as R from 'ramda';
import { log, error } from 'pure-logger';
import {
  PROFILE_EVENT,
  PROFILE_ERROR_EVENT,
  ACCOUNT_ERROR_EVENT,
  NEW_ACCOUNT_EVENT,
  DELETE_ACCOUNT_EVENT,
} from './profile-store';
// import { profileValidator } from './profile-validators';
import { landingStore, USER_EVENT } from '../landing/landing-store';

/**
 *
 * @param {ProfileModel} user
 * @return {Promise<ProfileModel>}
 */
export const updateProfileAction = async (user) => {
  try {
    // profileValidator(user);
    console.log("export const updateProfileAction = async (user) => {", user);

  } catch (e) {
    error('updateProfileAction', e);
    return Flux.dispatchEvent(PROFILE_ERROR_EVENT, e);
  }

  const DB = firebase.firestore();
  const profilesCollection = DB.collection('users');
  const oldUser = landingStore.getState(USER_EVENT);
  const profileRef = profilesCollection.doc(oldUser.email);
  await profileRef.set(user, { merge: true });
  Flux.dispatchEvent(USER_EVENT, user);
  return user;
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

  let profileData = {};
  if (query.exists) {
    profileData = query.data();
  }
  Flux.dispatchEvent(PROFILE_EVENT, profileData);
  return profileData;
};

export const addAccountAction = async (accountData) => {
  delete accountData.flagAccounts;
  log('addAccountAction', accountData);
  try {
    // TODO: Account Validator
    // profileValidator(accountData);
    log('addAccountAction(accountData);');
  } catch (e) {
    error('addAccountAction', e);
    Flux.dispatchEvent(ACCOUNT_ERROR_EVENT, e);
    throw e;
  }

  const DB = firebase.firestore();
  const usersCollection = DB.collection('users');
  const sessionUser = landingStore.getState(USER_EVENT);
  log('updateProfileAction:user', sessionUser);
  // We query the user from Firestore
  const userRef = usersCollection.doc(sessionUser.email);
  const user = await userRef.get();
  if (!user.exists) {
    const e = new Error(
      `User with email: ${sessionUser.email}, does not exist!`,
    );
    Flux.dispatchEvent(ACCOUNT_ERROR_EVENT, e);
    throw e;
  }

  const userData = user.data();
  const { bankAccounts } = userData;
  bankAccounts.push(accountData);

  try {
    await userRef.set({ bankAccounts }, { merge: true });
  } catch (e) {
    Flux.dispatchEvent(ACCOUNT_ERROR_EVENT, e);
    throw e;
  }

  Flux.dispatchEvent(NEW_ACCOUNT_EVENT, accountData);
  return accountData;
};

export const deleteAccountAction = async (accountData) => {
  try {
    // TODO: Account Validator
    // profileValidator(accountData);
    log('addAccountAction(accountData);');
  } catch (e) {
    error('addAccountAction', e);
    Flux.dispatchEvent(ACCOUNT_ERROR_EVENT, e);
    throw e;
  }

  const DB = firebase.firestore();
  const usersCollection = DB.collection('users');
  const sessionUser = landingStore.getState(USER_EVENT);
  log('updateProfileAction:user', sessionUser);
  // We query the user from Firestore
  const userRef = usersCollection.doc(sessionUser.email);
  const user = await userRef.get();
  if (!user.exists) {
    const e = new Error(
      `User with email: ${sessionUser.email}, does not exist!`,
    );
    Flux.dispatchEvent(ACCOUNT_ERROR_EVENT, e);
    throw e;
  }

  const userData = user.data();
  let { bankAccounts } = userData;
  let result = bankAccounts.filter((index) => ((index.number !== accountData.number) && (index.title !== accountData.title)) && (index.routingNumber !== accountData.routingNumber));
  bankAccounts = R.clone(result)

  try {
    await userRef.set({ bankAccounts }, { merge: true });
  } catch (e) {
    Flux.dispatchEvent(ACCOUNT_ERROR_EVENT, e);
    throw e;
  }

  Flux.dispatchEvent(DELETE_ACCOUNT_EVENT, accountData);
  return accountData;
}

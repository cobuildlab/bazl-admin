import firebase from 'firebase';
import {
  USER_EVENT,
  USER_ERROR_EVENT,
  LOGIN_EVENT,
  LOGIN_ERROR_EVENT,
  SIGNUP_EVENT,
  REQUEST_PASSWORD_RESET,
  LOGOUT_EVENT,
} from './landing-store';
import { log } from 'pure-logger';
import Flux from 'flux-state';
import * as R from 'ramda';
import { UserModel } from './landing-models';

/**
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{user: UserModel} || void>}
 */
export const onLogin = async ({ email, password, rememberMe }) => {
  const persistence = rememberMe
    ? firebase.auth.Auth.Persistence.LOCAL
    : firebase.auth.Auth.Persistence.SESSION;
  await firebase.auth().setPersistence(persistence);
  const AUTH = firebase.auth();
  let data;
  try {
    data = await AUTH.signInWithEmailAndPassword(email, password);
  } catch (err) {
    return Flux.dispatchEvent(LOGIN_ERROR_EVENT, new Error(err.message));
  }
  const { user: firebaseUser } = data;
  let user = await fetchUser(firebaseUser.email);
  log('onLogin:fetchUser');
  Flux.dispatchEvent(LOGIN_EVENT, user);
};

/**
 *
 * @param {string} email
 * @param {string} password
 * @returns {Promise<user: UserModel>}
 */
export const onSignup = async ({ email, password }) => {
  const AUTH = firebase.auth();
  let data;
  try {
    data = await AUTH.createUserWithEmailAndPassword(email, password);
    const { user: firebaseUser } = data;
    let user = await createUser(firebaseUser);
    user = await fetchUser(firebaseUser.email);

    return Flux.dispatchEvent(LOGIN_EVENT, user);
  } catch (err) {
    log('Error en onSignUp', err);
    return Flux.dispatchEvent(LOGIN_ERROR_EVENT, new Error(err.message));
  }
};

/**
 * fetches the user state necessary for the LOGIN_EVENT
 * @param {string} email
 * @returns {Promise<{user}>}
 */
export const fetchUser = async (email) => {
  const DB = firebase.firestore();
  const usersCollection = await DB.collection('users');

  const userRef = await usersCollection.doc(email);
  let query;
  try {
    query = await userRef.get({ source: 'server' });
  } catch (e) {
    Flux.dispatchEvent(USER_ERROR_EVENT, new Error(e.message));
    throw e;
  }

  if (!query.exists) return null;
  const user = query.data();

  Flux.dispatchEvent(USER_EVENT, user);
  return user;
};

/**Logs the user out of the system
 * @param {string} email
 * @return {Promise<void>}
 */
export const onLogout = async () => {
  const AUTH = firebase.auth();
  await AUTH.signOut();
  Flux.dispatchEvent(LOGOUT_EVENT, {});
};

/**
 * Creates a new user in the system
 * @param {string} firebaseUser the firebase uid
 * @return {Promise<UserModel>} user credentials or null if unexisting
 */
export const createUser = async (firebaseUser) => {
  const DB = firebase.firestore();
  const usersCollection = DB.collection('users');

  const user = R.clone(UserModel);
  user.email = firebaseUser.email;
  user.id = firebaseUser.uid;

  const userRef = await usersCollection.doc(firebaseUser.email);
  try {
    await userRef.set(user, { merge: true });
  } catch (err) {
    Flux.dispatchEvent(USER_ERROR_EVENT, new Error(err.message));
    throw err;
  }
  Flux.dispatchEvent(SIGNUP_EVENT, user);
  return user;
};

/**
 * function that dispatches an email to the user and triggers the REQUEST_RECOVER_PASSwORD
 * @param {string} email
 * @returns {Promise<{void}>}
 */
export const requestPasswordReset = async (email) => {
  const AUTH = firebase.auth();
  AUTH.sendPasswordResetEmail(email)
    .then((send) => Flux.dispatchEvent(REQUEST_PASSWORD_RESET, send))
    .catch((err) =>
      Flux.dispatchEvent(USER_ERROR_EVENT, new Error(err.message)),
    );
};

/**
 * function that pushes the user home
 * @param {props} props
 */
export const pushHome = async (props) => {
  const { history } = props;
  await history.push('/home');
};

export const confimrNewPassword = async (code, newPassword, email) => {
  // update property
  const DB = firebase.firestore();
  const userRef = DB.collection('users').doc(email.toLowerCase());
  await userRef.update({ needsPasswordReset: false });

  const AUTH = await firebase.auth();
  return AUTH.confirmPasswordReset(code, newPassword);
};

export const getUrlParam = (url, param) => {
  const params = [];
  const urlParams = new URLSearchParams(url);
  for (const index of urlParams.entries()) {
    params.push(index);
  }
  const findParamIndex = params.findIndex((value) => param === value[0]);
  return findParamIndex === -1 ? '' : params[findParamIndex][1];
};

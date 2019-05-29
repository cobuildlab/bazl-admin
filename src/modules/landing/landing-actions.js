import firebase from 'firebase';
import {
  USER_EVENT,
  USER_ERROR_EVENT,
  LOGIN_EVENT,
  LOGIN_ERROR_EVENT,
  SIGNUP_EVENT,
  SIGNUP_GOOGLE_EVENT,
  REQUEST_PASSWORD_RESET,
  LOGOUT_EVENT
} from './landing-store';
import { error, log } from 'pure-logger';
import Flux from 'flux-state';
import * as R from 'ramda';
import { userModel } from './landing-models';
import { FirebaseAuth } from 'react-firebaseui';


/** 
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{user: userModel} || void>}
 */
export const onLogin = async ({email, password}) => {

  await firebase.auth();
  const AUTH = firebase.auth();
 
  let data;
    try {
      data = await AUTH.signInWithEmailAndPassword(email, password);
    } catch (err) {
      console.log('LOGIN_EVENT');
      console.log(err);
      // error('onLogin', e)
      return Flux.dispatchEvent(LOGIN_ERROR_EVENT, new Error(err.message));
    }
    const { user: firebaseUser } = data;
    console.log('data from action',data);
    let user = await fetchUser(firebaseUser.email);
    log('onLogin:fetchUser');

    Flux.dispatchEvent(LOGIN_EVENT, { user });
};

export const onGoogleLogin = async () =>{
  await firebase.auth();
  const AUTH = firebase.auth();

  await AUTH.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then((authCredential) => {
      let {user} = authCredential;
      console.log(user) ;
      Flux.dispatchEvent(SIGNUP_GOOGLE_EVENT, { user });
    });
}

/**
 * 
 * @param {string} email
 * @param {string} password
 * @returns {Promise<user: userModel>}
 */
export const OnSignup = async ({email,password}) => {
  await firebase.auth()
  const AUTH= firebase.auth()
  let data
  try {
    data = await AUTH.createUserWithEmailAndPassword(email, password);
  } catch (e) {
    console.log('LOGIN_EVENT')
    error('onSignup', e)
  }
  const { user: firebaseUser} = data;
  let user = await createUser(firebaseUser.email);
  log('onLogin:createUser', user);
  Flux.dispatchEvent(LOGIN_EVENT, { user });
};

/**
 * fetches the user state necessary for the LOGIN_EVENT
 * @param {string} email 
 * @returns {Promise<{user}>}
 */
export const fetchUser = async (email) => {
  const DB = firebase.firestore();
  const usersCollection = DB.collection('users');

  const userRef = usersCollection.doc(email);
  let query;
  try{
    query = await userRef.get({ source: 'server' });
  } catch(e) {
    Flux.dispatchEvent(USER_ERROR_EVENT, new Error(e.message))
    throw e;
  }
  log('fetchUser', query);

  if(!query.exists) return null;
    const user = query.data()

  Flux.dispatchEvent(USER_EVENT, user);
  log('fetchUser:credentials', user);
  return user;
}

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

    const user = R.clone(userModel);
    user.email = firebaseUser.email;
    user.password = firebaseUser.password;

    const userRef = usersCollection.doc(firebaseUser.email)
    try{
      await userRef.set(user, {merge: true});
    } catch (e) {
      Flux.dispatchEvent(USER_ERROR_EVENT, user)
      throw e;
    }
    Flux.dispatchEvent(SIGNUP_EVENT, user);
    return user;
  }

/**
 * function that dispatches an email to the user and triggers the REQUEST_RECOVER_PASSwORD
 * @param {string} email 
 * @returns {Promise<{void}>}
 */
export const requestPasswordReset = async (email) => {
  const AUTH = firebase.auth();
  AUTH.sendPasswordResetEmail(email)
    .then((send) => Flux.dispatchEvent(REQUEST_PASSWORD_RESET, send))
    .catch((err) => Flux.dispatchEvent(USER_ERROR_EVENT, err));
  };
  
export const pushHome = async (props) => {
  const { history } = props
  // const { history } = this.props
  await history.push('/home')
}
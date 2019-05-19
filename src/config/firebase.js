import firebase from 'firebase';
import { pushHome } from '../modules/landing/landing-actions';

export const config = {
  apiKey: "AIzaSyAUhqrxL0qCgk7DD_0pvtpW263WRLUZKa0",
  authDomain: "bazl-web.firebaseapp.com",
  databaseURL: "https://bazl-web.firebaseio.com",
  projectId: "bazl-web",
  storageBucket: "bazl-web.appspot.com",
  messagingSenderId: "1011123945178",
  appId: "1:1011123945178:web:f3a559014d35a048"
};

export const uiConfig = {
  // Popup signin flow rather than redirect flow
  signInFlow: 'popup',
  // this will display Google and Facebook as auth providers
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => {pushHome()}
  }
}
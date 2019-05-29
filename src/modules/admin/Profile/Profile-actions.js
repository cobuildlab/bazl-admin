// import firebase from 'firebase';
// import Flux from 'flux-state';
// import { log, error } from 'pure-logger';
// // import {UserModel} from './auth-models';
// // import * as R from 'ramda';
// import { PROFILE_ERROR_EVENT, PROFILE_EVENT, UPDATE_PROFILE_EVENT } from './profile-store';
// import { profileValidator } from './profile-validators';
// import { authStore, USER_EVENT } from '../auth/auth-store';

// import { profileStore, UPDATE_USER_EVENT } from './Profile-store';
// /**
//  *
//  * @param {ProfileModel} profileData
//  * @return {Promise<ProfileModel>}
//  */
// export const updateProfileAction = async (profileData) => {
//     log('updateProfileAction', profileData);
//     try {
//       profileValidator(profileData);
//     } catch (e) {
//       error('updateProfileAction', e);
//       return Flux.dispatchEvent(PROFILE_ERROR_EVENT, e);
//     }
  
//     const DB = firebase.firestore();
//     const profilesCollection = DB.collection('profiles');
//     const user = profileStore.getState(USER_EVENT);
//     log('updateProfileAction:user', user);
//     const profileRef = profilesCollection.doc(user.email);
//     logProfile(user.email, profileData, new Date().getTime());
//     await profileRef.set(profileData, { merge: true });
//     Flux.dispatchEvent(UPDATE_PROFILE_EVENT, profileData);
//     return profileData;
//   };
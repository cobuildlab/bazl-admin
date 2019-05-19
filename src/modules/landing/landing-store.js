import Flux from 'flux-state';


/**
 * @property {string} USER_EVENT gets the current user information.
 * @property {string} USER_ERROR triggers when the user data cant be fetched
 */
export const USER_EVENT = 'USER_EVENT';
export const USER_ERROR_EVENT = 'USER_ERROR_EVENT';

/**
 * @property {string} LOGIN_EVENT triggers when a user login into the system
 * @property {string} LOGIN_ERROR_EVENT triggers when a user fails to login
 * @property {string} SIGN_EVENT triggers when a new user logs into the system
 */
export const LOGIN_EVENT = 'LOGIN_EVENT';
export const LOGIN_ERROR_EVENT = 'LOGIN_ERRIR_EVENT';
export const SIGNUP_EVENT = 'SIGNUP_EVENT';

/**
 * @property {string} REQUEST_RECOVER_PASSWORD triggers when a user asks to change their password
 */
export const REQUEST_PASSWORD_RESET = 'REQUEST_PASSWORD_RESET';

/**
 * @property {string} LOGOUT_EVENT triggers when the user logs out of the system
 */
export const LOGOUT_EVENT = 'LOGOUT_EVENT';
/**
 * This store manages the events that triggers on all user actions
 */
class LandingStore extends Flux.DashStore {
  constructor() {
    super();
    this.addEvent(LOGIN_EVENT);
    this.addEvent(LOGIN_ERROR_EVENT);
    this.addEvent(SIGNUP_EVENT);
    this.addEvent(USER_EVENT);
    this.addEvent(USER_ERROR_EVENT);
    this.addEvent(REQUEST_PASSWORD_RESET);
    this.addEvent(LOGOUT_EVENT);
  }
}

const landingStore = new LandingStore();

export { landingStore };
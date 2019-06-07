import Flux from 'flux-state';

/**
 * @property {string} UPDATE_USER_EVENT triggers when a user login into the system
 * @property {string} PROFILE_ERROR_EVENT triggers when a user fails to login
 * @property {string} PROFILE_EVENT triggers when a user fails to login
 * @property {string} ACCOUNT_ERROR_EVENT triggers when a user fails to login
 */
export const UPDATE_USER_EVENT = 'UPDATE_USER_EVENT';
export const PROFILE_ERROR_EVENT = 'PROFILE_ERROR_EVENT';
export const PROFILE_EVENT = 'PROFILE_EVENT';
export const ACCOUNT_ERROR_EVENT = 'ACCOUNT_ERROR_EVENT';

/**
 * This store manages the events that triggers on all user actions
 */
class LandingStore extends Flux.DashStore {
  constructor() {
    super();
    this.addEvent(UPDATE_USER_EVENT);
    this.addEvent(PROFILE_ERROR_EVENT);
    this.addEvent(PROFILE_EVENT);
    this.addEvent(ACCOUNT_ERROR_EVENT);
  }
}

const landingStore = new LandingStore();

export { landingStore };
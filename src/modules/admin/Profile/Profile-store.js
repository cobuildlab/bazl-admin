import Flux from 'flux-state';

/**
 * @property {string} UPDATE_USER_EVENT triggers when a user update own profile
 */
export const UPDATE_USER_EVENT = 'UPDATE_USER_EVENT';


/**
 * This store manages the events that triggers on all user actions
 */
class ProfileStore extends Flux.DashStore {
  constructor() {
    super();
    this.addEvent(UPDATE_USER_EVENT);
  }
}

const profileStore = new ProfileStore();

export { profileStore };
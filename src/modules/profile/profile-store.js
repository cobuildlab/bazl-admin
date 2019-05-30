import Flux from 'flux-state';

/**
 * triggers when a user is updated 
 * @type {string} 
 */
export const UPDATE_USER_EVENT = 'UPDATE_USER_EVENT'

class ProfileStore extends Flux.DashStore {
  constructor() {
    super()
    this.addEvent(UPDATE_USER_EVENT);
  }
}

const profileStore = new ProfileStore();

export { profileStore };
import React from "react";
import * as R from 'ramda';
import View from 'react-flux-state';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import { userModel } from './Profile-models';
import { landingStore, USER_EVENT } from "../landing/landing-store";
import { 
  fetchProfileAction, 
  updateProfileAction 
} from './profile-actions';


class ProfileView extends View {
  constructor(props) {
    super(props);
    const user = landingStore.getState(USER_EVENT);
    this.state = {
      editProfile: false,
      // user: {
      //   Id: null,
      //   name: 'Name Merchants',
      //   email: '',
      //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      //   bankAccounts: [
      //     { Id: 1, title: 'title_1', number: 'number1' },
      //     { Id: 2, title: 'title_2', number: 'number2' },
      //     { Id: 3, title: 'title_3', number: 'number3' },
      //     { Id: 4, title: 'title_4', number: 'number4' },
      //   ],
      //   picture: null,
      // }
      user: { ...R.clone(userModel), ...user },
    }
  }

  componentDidMount() {
    this.subscribe(landingStore, USER_EVENT, (state) => {
      const { data } = this.state;
      const { user } = data;
      data.user = R.mergeRight(user, state);
      this.setState({ data });
    });
    fetchProfileAction();
  }

  onDeleteBankAccount = (bank) => {
    const { bankAccounts } = R.clone(this.state.user);
    const result = bankAccounts.filter(index => index.Id !== bank.Id);
    this.setState(state => ({
      ...state,
      user: { ...state.user, bankAccounts: result }
    }))
    this.flagEdit();
  }

  flagEdit = () => {
    this.setState(prevState => ({
      editProfile: !prevState.editProfile
    }));
  }

  onUpdateUser = (updateUser) => {
    var user = R.clone(this.state.user);
    user.name = updateUser.name;
    user.description = updateUser.description;
    user.picture = updateUser.picture;
    this.setState({
      editProfile: false,
      user
    });
    updateProfileAction(user);
  }

  render() {
    let { editProfile, user } = this.state;
    return (
      <React.Fragment>
        {
          !editProfile ? (
            <Profile flagEdit={this.flagEdit} onDelete={this.onDeleteBankAccount} user={user} onSave={this.onUpdateUser}></Profile>
          ) : (
              <EditProfile flagEdit={this.flagEdit} onDelete={this.onDeleteBankAccount} user={user}  onSave={this.onUpdateUser}></EditProfile>
            )
        }
      </React.Fragment>
    );
  }
}

export default ProfileView;

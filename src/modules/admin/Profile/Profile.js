import React from "react";
import View from 'react-flux-state';
import Profile from '../../../components/Profile';
import EditProfile from '../../../components/EditProfile';

class ProfileView extends View {
  constructor(props) {
    super(props);
    this.state = {
      editProfile: false,
      user: {
        Id: null,
        name: 'Name Merchants',
        email: '',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        bankAccounts: [
          { Id: 1, title: 'title_1', number: 'number1' },
          { Id: 2, title: 'title_2', number: 'number2' },
          { Id: 3, title: 'title_3', number: 'number3' },
        ],
        picture: null,
      }
    }
  }

  onEdit = () => {
    this.setState(prevState => ({
      editProfile: !prevState.editProfile
    }));
  }

  onUpdateUser = (newUser) => {
    this.setState({ 
      editProfile: false,
      user: newUser
    })   
  }

  render() {
    let { editProfile, user } = this.state;
    return (
      <React.Fragment>
        {
          !editProfile ? (
            <Profile onClickEdit={this.onEdit} user={user}></Profile>
          ) : (
              <EditProfile onSave={this.onUpdateUser} onCancel={this.onEdit} user={user}></EditProfile>
            )
        }
      </React.Fragment>
    );
  }
}

export default ProfileView;

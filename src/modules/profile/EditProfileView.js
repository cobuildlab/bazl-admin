import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBIcon } from 'mdbreact';
import SidebarComponent from '../../components/SidebarComponent';
import SliderCards from '../../components/SliderCards';
import { EditBasicInformation } from './components/EditBasicInformation';
import {
  addAccountAction,
  deleteAccountAction,
  fetchProfileAction,
  updateProfileAction,
} from './profile-actions';
import { Loader } from '../../components/Loader';
import View from 'react-flux-state';
import {
  ACCOUNT_ERROR_EVENT,
  NEW_ACCOUNT_EVENT,
  DELETE_ACCOUNT_EVENT,
  profileStore,
} from './profile-store';
import { toast } from 'react-toastify/index';
import * as R from 'ramda';
import { landingStore, USER_EVENT } from '../landing/landing-store';
import EditBankInformation from './components/EditBankInformation';
import { userModel } from './Profile-models';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

class EditProfileView extends View {
  constructor(props) {
    super(props);
    const user = landingStore.getState(USER_EVENT);
    this.state = {
      user: { ...R.clone(userModel), ...user },
      loadingBankAccounts: false,
      loadingUser: false
    };
  }

  componentDidMount() {
    this.subscribe(profileStore, ACCOUNT_ERROR_EVENT, (e) => {
      toast.error(e.message);
      this.setState({ loadingBankAccounts: false });
    });
    this.subscribe(landingStore, USER_EVENT, (state) => {
      this.setState({ loadingUser: false }, () => {
        this.props.history.push('/profile');
      });
    });
    this.subscribe(profileStore, ACCOUNT_ERROR_EVENT, (e) => {
      toast.error(e.message);
      this.setState({ loadingBankAccounts: false });
    });
    this.subscribe(profileStore, NEW_ACCOUNT_EVENT, (bankAccount) => {
      const { user } = this.state;
      user.bankAccounts.push(bankAccount);
      this.setState({
        loadingBankAccounts: false,
        user,
      });
    });
    this.subscribe(profileStore, DELETE_ACCOUNT_EVENT, (bankAccount) => {
      const { user } = this.state;      
      let result = user.bankAccounts.filter((index) => ((index.number !== bankAccount.number) && (index.title !== bankAccount.title)) && (index.routingNumber !== bankAccount.routingNumber));
      user.bankAccounts = R.clone(result);
      this.setState({
        loadingBankAccounts: false,
        user,
      });
    });


    fetchProfileAction();
  }

  newAccount = (account) => {
    this.setState({ loadingBankAccounts: true }, () => {
      addAccountAction({ ...account });
    });
  };

  editAccount = (bank) => {
    let { bankAccounts } = this.state.user;
    // eslint-disable-next-line
    bankAccounts.map(function (bankAccount, i) {
      if (bank.id === bankAccount.id) {
        bankAccounts[i] = bank;
      }
    });
    this.setState({});
  };

  onDeleteBankAccount = (account) => {
    this.setState({ loadingBankAccounts: true }, () => {
      deleteAccountAction({ ...account });
    });
  };

  onUpdateUser = (updateUser) => {
    var user = R.clone(this.state.user);
    user.name = updateUser.name;
    user.description = updateUser.description;
    user.picture = updateUser.picture;
    this.setState({ loadingUser: true }, () => {
      updateProfileAction(user);
    });
  };

  render() {
    let {
      name,
      description,
      picture,
      bankAccounts,
      loadingBankAccounts,
      loadingUser
    } = this.state.user;
    return (
      <SidebarComponent>
        <div className="d-flex justify-content-between nav-admin body">
          <div>
            <h2 className="m-0">Edit Profile</h2>
          </div>
          <div>
            <Link to={'/profile'} className="btn btn-circle btn-circle-link">
              Profile
            <MDBIcon icon="upload" className="ml-1" />
            </Link>
          </div>
        </div>
        <MDBContainer>
          <MDBRow>
            {loadingUser ? (
              <ClipLoader
                sizeUnit={'px'}
                size={120}
                color={'#44c1f6'}
                loading={true}
              />
            ) : (
                <EditBasicInformation
                  name={name}
                  description={description}
                  picture={picture}
                  onCancel={this.flagEdit}
                  onSave={this.onUpdateUser}
                />
              )}
          </MDBRow>
          <MDBRow>
            <MDBCol md="1" />
            <MDBCol md="10">
              {loadingBankAccounts ? (
                <Loader />
              ) : (
                  <EditBankInformation
                    editAccount={this.editAccount}
                    newAccount={this.newAccount}
                    bankAccounts={bankAccounts}
                    onDelete={this.onDeleteBankAccount}
                  />
                )}
            </MDBCol>
            <MDBCol md="1" />
          </MDBRow>
          <MDBRow>
            <MDBCol md="2" />
            <MDBCol md="8">
              <div className="mt-3 mb-5">
                <SliderCards />
              </div>
            </MDBCol>
            <MDBCol md="2" />
          </MDBRow>
        </MDBContainer>
      </SidebarComponent>
    );
  }
}

export default EditProfileView;

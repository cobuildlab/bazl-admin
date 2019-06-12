import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBIcon } from 'mdbreact';
import SidebarComponent from '../../components/SidebarComponent';
import SliderCards from '../../components/SliderCards';
import { EditBasicInformation } from './components/EditBasicInformation';
import {
  addAccountAction,
  updateAccountAction,
  fetchProfileAction,
  updateProfileAction,
} from './profile-actions';
import View from 'react-flux-state';
import {
  ACCOUNT_ERROR_EVENT,
  NEW_ACCOUNT_EVENT,
  DELETE_ACCOUNT_EVENT,
  UPDATE_ACCOUNT_EVENT,
  profileStore,
} from './profile-store';
import { toast } from 'react-toastify/index';
import * as R from 'ramda';
import { landingStore, USER_EVENT } from '../landing/landing-store';
import EditBankInformation from './components/EditBankInformation';
import { userModel } from './Profile-models';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import ModalConfirm from '../../components/ModalConfirm';

class EditProfileView extends View {
  constructor(props) {
    super(props);
    const user = landingStore.getState(USER_EVENT);
    this.state = {
      user: { ...R.clone(userModel), ...user },
      loadingBankAccounts: false,
      loadingUser: false,
      deleteBankAccountModalIsOpen: false,
      bankAccountIndex: 0,
    };
  }

  componentDidMount() {
    this.subscribe(profileStore, ACCOUNT_ERROR_EVENT, (e) => {
      toast.error(e.message);
      this.setState({ loadingBankAccounts: false });
    });
    this.subscribe(landingStore, USER_EVENT, (user) => {
      this.setState({
        loadingUser: false,
        loadingBankAccounts: false,
        deleteBankAccountModalIsOpen: false,
        user,
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
    this.subscribe(profileStore, DELETE_ACCOUNT_EVENT, (i) => {
      const { user } = this.state;
      user.bankAccounts.splice(i, 1);
      this.setState({
        loadingBankAccounts: false,
        user,
      });
    });
    this.subscribe(profileStore, UPDATE_ACCOUNT_EVENT, (bankAccount) => {
      let { user } = this.state;
      user.bankAccounts[bankAccount.id] = bankAccount;
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

  editAccount = (account) => {
    this.setState({ loadingBankAccounts: true }, () => {
      updateAccountAction({ ...account });
    });
  };

  onDeleteBankAccount = (i) => {
    this.setState((prevState) => ({
      deleteBankAccountModalIsOpen: !prevState.deleteBankAccountModalIsOpen,
      bankAccountIndex: i,
    }));
  };

  deleteBankAccount = () => {
    this.setState({ loadingBankAccounts: true }, () => {
      const user = R.clone(this.state.user);
      const { bankAccounts } = user;
      bankAccounts.splice(this.state.bankAccountIndex, 1);
      updateProfileAction(user);
    });
  };

  onUpdateUser = (updateUser) => {
    const user = R.clone(this.state.user);
    user.name = updateUser.name;
    user.description = updateUser.description;
    user.picture = updateUser.picture;
    this.setState({ loadingUser: true }, () => {
      updateProfileAction(user);
    });
  };

  toggleModal = () => {
    this.setState((prevState) => ({
      deleteBankAccountModalIsOpen: !prevState.deleteBankAccountModalIsOpen,
    }));
  };

  render() {
    const { name, description, picture, bankAccounts } = this.state.user;
    const {
      loadingBankAccounts,
      loadingUser,
      deleteBankAccountModalIsOpen,
    } = this.state;

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
                // <Loader />
                <ClipLoader
                  sizeUnit={'px'}
                  size={120}
                  color={'#44c1f6'}
                  loading={true}
                />
              ) : (
                <div>
                  <ModalConfirm
                    open={deleteBankAccountModalIsOpen}
                    onClose={this.toggleModal}
                    text={'Are you sure you want to Delete the Bank Account?'}
                    onOk={this.deleteBankAccount}
                  />
                  <EditBankInformation
                    editAccount={this.editAccount}
                    newAccount={this.newAccount}
                    bankAccounts={bankAccounts}
                    onDelete={this.onDeleteBankAccount}
                  />
                </div>
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

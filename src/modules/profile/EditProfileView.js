import React from 'react';
import { MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import SidebarComponent from '../../components/SidebarComponent';
import SliderCards from '../../components/SliderCards';
import { EditBasicInformation } from './components/EditBasicInformation';
import {
  addAccountAction,
  fetchProfileAction,
  updateProfileAction,
} from './profile-actions';
import { Loader } from '../../components/Loader';
import View from 'react-flux-state';
import {
  ACCOUNT_ERROR_EVENT,
  NEW_ACCOUNT_EVENT,
  profileStore,
} from './profile-store';
import { toast } from 'react-toastify/index';
import * as R from 'ramda';
import { landingStore, USER_EVENT } from '../landing/landing-store';
import EditBankInformation from './components/EditBankInformation';
import { userModel } from './Profile-models';

class EditProfileView extends View {
  constructor(props) {
    super(props);
    const user = landingStore.getState(USER_EVENT);
    this.state = {
      user: { ...R.clone(userModel), ...user },
      loadingBankAccounts: false,
    };
  }

  componentDidMount() {
    this.subscribe(profileStore, ACCOUNT_ERROR_EVENT, (e) => {
      toast.error(e.message);
      this.setState({ loadingBankAccounts: false });
    });

    this.subscribe(profileStore, NEW_ACCOUNT_EVENT, (bankAccount) => {
      const { user } = this.state;
      user.bankAccounts.push(bankAccount);
      this.setState({
        loading: false,
        user,
      });
    });

    this.subscribe(landingStore, USER_EVENT, (state) => {
      const { data } = this.state;
      const { user } = data;
      data.user = R.mergeRight(user, state);
      this.setState({ loading: false }, () => {
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
        loading: false,
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
    bankAccounts.map(function(bankAccount, i) {
      if (bank.id === bankAccount.id) {
        bankAccounts[i] = bank;
      }
    });
    this.setState({});
  };

  onDeleteBankAccount = (bank) => {
    const { bankAccounts } = R.clone(this.state.user);
    const result = bankAccounts.filter((index) => index.Id !== bank.Id);
    this.setState((state) => ({
      ...state,
      user: { ...state.user, bankAccounts: result },
    }));
    this.flagEdit();
  };

  onUpdateUser = (updateUser) => {
    var user = R.clone(this.state.user);
    user.name = updateUser.name;
    user.description = updateUser.description;
    user.picture = updateUser.picture;
    this.setState({
      editProfile: false,
      user,
    });
    updateProfileAction(user);
  };

  editAccount = (bank) => {
    let { bankAccounts } = this.state.user;
    // eslint-disable-next-line
    bankAccounts.map(function(bankAccount, i) {
      if (bank.id === bankAccount.id) {
        bankAccounts[i] = bank;
      }
    });
    this.setState({});
  };

  render() {
    const { flagEdit, onSave, onDelete } = this.props;
    let {
      name,
      description,
      picture,
      bankAccounts,
      loadingBankAccounts,
    } = this.state.user;
    return (
      <SidebarComponent>
        <div className="d-flex justify-content-between nav-admin body">
          <div>
            <h2 className="m-0">Edit Profile</h2>
          </div>
        </div>
        <MDBContainer>
          <MDBRow>
            <EditBasicInformation
              name={name}
              description={description}
              picture={picture}
              flagInformation={false}
              onCancel={flagEdit}
              onSave={onSave}
            />
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
                  flagInformation={false}
                  onDelete={onDelete}
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

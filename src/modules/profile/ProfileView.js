import React from 'react';
import View from 'react-flux-state';
import { toast } from 'react-toastify';
import * as R from 'ramda';
import { landingStore, USER_EVENT } from '../landing/landing-store';
import SidebarComponent from '../../components/SidebarComponent';
import { Loader } from '../../components/Loader';
import { Link } from 'react-router-dom';
import { MDBCol, MDBContainer, MDBIcon, MDBRow, MDBAnimation } from 'mdbreact';
import { BasicInformation } from './components/BasicInformation';
import SliderCardsMap from '../../components/SliderCardsMap';
import { userModel } from './Profile-models';
import { inventoryStore, INVENTORY_EVENT } from '../inventory/inventory-store';
import { fetchUserProducts } from '../inventory/inventory-actions';
import {
  profileStore,
  ACCOUNT_ERROR_EVENT,
  NEW_ACCOUNT_EVENT,
  DELETE_ACCOUNT_EVENT,
  UPDATE_ACCOUNT_EVENT,
} from './profile-store';
import {
  addAccountAction,
  updateAccountAction,
  updateProfileAction,
} from './profile-actions';
import { ModalConfirm } from '../../components/ModalConfirm';
import { EditBankInformation } from './components/EditBankInformation';

class ProfileView extends View {
  constructor(props) {
    super(props);
    const user = landingStore.getState(USER_EVENT);
    this.state = {
      user: { ...R.clone(userModel), ...user },
      loadingBankAccounts: false,
      deleteBankAccountModalIsOpen: false,
      inventory: [],
      loadingInventory: true,
      data: {
        totalSales: '0',
      },
    };
  }
  componentDidMount() {
    this.subscribe(inventoryStore, INVENTORY_EVENT, (data) => {
      let { inventory } = this.state;
      inventory = R.clone(data);
      this.setState({
        inventory,
        loadingInventory: false,
      });
    });
    this.subscribe(profileStore, ACCOUNT_ERROR_EVENT, (e) => {
      toast.error(e.message);
      this.setState({ loadingBankAccounts: false });
    });

    this.subscribe(landingStore, USER_EVENT, (user) => {
      this.setState(
        {
          loadingUser: false,
          loadingBankAccounts: false,
          deleteBankAccountModalIsOpen: false,
          user,
        },
        () => {
          toast.info('Successful');
        },
      );
    });

    this.subscribe(profileStore, ACCOUNT_ERROR_EVENT, (e) => {
      toast.error(e.message);
      this.setState({ loadingBankAccounts: false });
    });

    this.subscribe(profileStore, NEW_ACCOUNT_EVENT, (bankAccount) => {
      const { user } = this.state;
      user.bankAccounts.push(bankAccount);
      this.setState(
        {
          loadingBankAccounts: false,
          user,
        },
        () => {
          toast.info('New Account Successfully Created');
        },
      );
    });

    this.subscribe(profileStore, DELETE_ACCOUNT_EVENT, (index) => {
      const { user } = this.state;
      user.bankAccounts.splice(index, 1);
      this.setState(
        {
          loadingBankAccounts: false,
          user,
        },
        () => {
          toast.info('Account Deleted');
        },
      );
    });

    this.subscribe(profileStore, UPDATE_ACCOUNT_EVENT, (bankAccount) => {
      let { user } = this.state;
      let index = bankAccount[1];
      user.bankAccounts[index] = bankAccount[0];
      this.setState(
        {
          loadingBankAccounts: false,
          user,
        },
        () => {
          toast.info('Account Updated');
        },
      );
    });
    fetchUserProducts();
  }

  newAccount = (account) => {
    this.setState({ loadingBankAccounts: true }, () => {
      addAccountAction({ ...account });
    });
  };

  editAccount = (account, index) => {
    this.setState({ loadingBankAccounts: true }, () => {
      updateAccountAction({ ...account }, index);
    });
  };

  onDeleteBankAccount = (index) => {
    this.setState((prevState) => ({
      deleteBankAccountModalIsOpen: !prevState.deleteBankAccountModalIsOpen,
      bankAccountIndex: index,
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

  render() {
    const {
      inventory,
      user,
      loadingInventory,
      data,
      loadingBankAccounts,
      deleteBankAccountModalIsOpen,
    } = this.state;
    const { bankAccounts } = this.state.user;
    return (
      <SidebarComponent>
        <div className="d-flex justify-content-between nav-admin">
          <div>
            <h2 className="m-0">Profile</h2>
          </div>
          <div>
            <Link
              to={'/edit-profile'}
              className="btn btn-circle btn-circle-link">
              Edit Profile
              <MDBIcon icon="upload" className="ml-1" />
            </Link>
          </div>
        </div>
        <MDBAnimation type="fadeIn">
          <MDBContainer>
            <MDBRow>
              <BasicInformation user={user} data={data} />
            </MDBRow>
            <hr />
            <MDBRow>
              <MDBCol md="3" />
              <MDBCol md="9">
                {loadingBankAccounts ? (
                  <div className="text-center">
                    <Loader />
                  </div>
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
            </MDBRow>
            <MDBRow>
              <MDBCol md="3" />
              <MDBCol md="9">
                <h5 className="font-weight-bold text-black-50">
                  Recently Publications
                </h5>
                {loadingInventory ? (
                  <div className="text-center">
                    <Loader />
                  </div>
                ) : (
                  <SliderCardsMap inventory={inventory} />
                )}
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBAnimation>
      </SidebarComponent>
    );
  }
}
export default ProfileView;

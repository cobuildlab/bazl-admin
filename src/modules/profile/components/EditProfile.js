import React from 'react';
import { Link } from 'react-router-dom';
import { MDBCol, MDBContainer, MDBIcon, MDBRow } from 'mdbreact';
import SidebarComponent from '../../../components/SidebarComponent';
import SliderCards from '../../../components/SliderCards';
import BasicInformation from './BasicInformation';
import BankInformation from './BankInformation';
import { addAccountAction } from '../profile-actions';
import { Loader } from '../../../components/Loader';
import View from 'react-flux-state';
import {
  ACCOUNT_ERROR_EVENT,
  NEW_ACCOUNT_EVENT,
  profileStore,
} from '../profile-store';
import { toast } from 'react-toastify';

class EditProfile extends View {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
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
          <div>
            <Link onClick={flagEdit} className="btn btn-circle btn-circle-link">
              Profile
              <MDBIcon icon="upload" className="ml-1" />
            </Link>
          </div>
        </div>
        <MDBContainer>
          <MDBRow>
            <BasicInformation
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
                <BankInformation
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

export default EditProfile;

import React from "react";
import { Link } from "react-router-dom";
import {
  MDBIcon,
  MDBContainer,
  MDBCol,
  MDBRow,
} from "mdbreact";
import SidebarComponent from "../../../components/SidebarComponent";
import SliderCards from "../../../components/SliderCards";
import BasicInformation from './BasicInformation';
import BankInformation from './BankInformation'
import { addAccountAction } from '../profile-actions';

class EditProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: this.props.user
    }
  }

  newAccount = (account) => {
    const { type, title, number, routingNumber } = account
    const newAccount = {
      'type': type,
      'title': title,
      'number': number,
      'routingNumber': routingNumber
    }
    addAccountAction(newAccount); 
    const data = this.state.user.bankAccounts;
    this.setState({
      data: data.push(newAccount)
    });
  }

  editAccount = (bank) => {
    let { bankAccounts } = this.state.user;
    // eslint-disable-next-line
    bankAccounts.map(function (bankAccount, i) {
      if (bank.id === bankAccount.id) {
        bankAccounts[i] = bank;
      }
    });
    this.setState({});
  }

  render() {
    const { flagEdit, onSave, onDelete } = this.props;
    let { name, description, picture, bankAccounts } = this.state.user;
    return (
      <SidebarComponent>
        <div className="d-flex justify-content-between nav-admin body">
          <div>
            <h2 className="m-0">Edit Profile</h2>
          </div>
          <div>
            <Link
              onClick={flagEdit}
              className="btn btn-circle btn-circle-link"
            >
              Profile<MDBIcon icon="upload" className="ml-1" />
            </Link>
          </div>
        </div>
        <MDBContainer>
          <MDBRow>
            <BasicInformation name={name} description={description} picture={picture} flagInformation={false} onCancel={flagEdit} onSave={onSave} />
          </MDBRow>

          <MDBRow>
            <MDBCol md="1"></MDBCol>
            <MDBCol md="10">
              <BankInformation
                editAccount={this.editAccount}
                newAccount={this.newAccount}
                bankAccounts={bankAccounts}
                flagInformation={false}
                onDelete={onDelete}
              />
            </MDBCol>
            <MDBCol md="1"></MDBCol>
          </MDBRow>

          <MDBRow>
            <MDBCol md="2"></MDBCol>
            <MDBCol md="8" >
              <div className="mt-3 mb-5">
                <SliderCards />
              </div>
            </MDBCol>
            <MDBCol md="2"></MDBCol>
          </MDBRow>

        </MDBContainer>
      </SidebarComponent>
    );
  }
}

export default EditProfile;
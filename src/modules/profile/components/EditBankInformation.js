import React from 'react';
import PropTypes from 'prop-types';
import {
  MDBBtn,
  MDBInput,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBIcon,
  MDBContainer,
} from 'mdbreact';
import { EditableBankAccount } from './EditableBankAccount';

class EditBankInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: false,
      title: '',
      number: '',
      routingNumber: '',
      showNewAccountForm: false,
    };
  }

  onChangeBank = ({ target: { name, value } }) => {
    if (name === 'type') {
      this.setState((prevState) => ({
        type: !prevState.type,
      }));
    } else {
      this.setState({
        [name]: value,
      });
    }
  };

  changeFlag = () => {
    this.setState((prevState) => ({
      showNewAccountForm: !prevState.showNewAccountForm,
      type: false,
      title: '',
      number: '',
      routingNumber: '',
    }));
  };

  render() {
    const { bankAccounts, onDelete, newAccount, editAccount } = this.props;
    let { type, title, number, routingNumber, showNewAccountForm } = this.state;
    return (
      <React.Fragment>
        <MDBCol md="12">
          <h6 className="mt-4 mb-3">Bank Accounts</h6>
        </MDBCol>
        {bankAccounts.length !== 0 ? (
          <div>
            {bankAccounts.map((account, index) => (
              <EditableBankAccount
                key={index}
                index={index}
                account={account}
                editAccount={editAccount}
                onDelete={() => onDelete(index)}
              />
            ))}
          </div>
        ) : (
          <MDBContainer className="body" fluid>
            <h4 className="font-weight-bold text-black-50">
              There Are No Bank Accounts Yet
            </h4>
          </MDBContainer>
        )}

        <div className="d-flex justify-content-center align-items-center">
          <MDBBtn onClick={() => this.changeFlag()} className="btn btn-circle">
            Add Account
          </MDBBtn>
        </div>
        {showNewAccountForm ? (
          <div>
            <h5>New Account</h5>
            <MDBCard style={{ marginBottom: '20px' }}>
              <MDBCardBody style={{ paddingBottom: '0px', paddingTop: '0px' }}>
                <MDBRow className="d-flex justify-content-around align-items-center text-center">
                  <MDBCol md="2" style={{ paddingLeft: '0px' }}>
                    <MDBInput
                      label="Business Account"
                      className="mt-0"
                      type="checkbox"
                      name="type"
                      onChange={this.onChangeBank}
                      style={{ position: 'relative', marginLeft: '0px' }}
                      checked={type}
                    />
                  </MDBCol>
                  <MDBCol md="3">
                    <MDBInput
                      label="Holder's name"
                      className="mt-0"
                      type="text"
                      name="title"
                      value={title}
                      onChange={this.onChangeBank}
                    />
                  </MDBCol>
                  <MDBCol md="3">
                    <MDBInput
                      label="Account number"
                      className="mt-0"
                      type="text"
                      name="number"
                      value={number}
                      onChange={this.onChangeBank}
                    />
                  </MDBCol>
                  <MDBCol md="3">
                    <MDBInput
                      label="Routing number"
                      className="mt-0"
                      type="text"
                      name="routingNumber"
                      value={routingNumber}
                      onChange={this.onChangeBank}
                    />
                  </MDBCol>
                  <MDBCol md="1">
                    <MDBBtn
                      className="btn-add"
                      onClick={() => {
                        newAccount(this.state);
                        this.changeFlag();
                      }}>
                      <MDBIcon icon="plus" />
                    </MDBBtn>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </div>
        ) : (
          <div></div>
        )}
      </React.Fragment>
    );
  }
}

EditBankInformation.propTypes = {
  bankAccounts: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  newAccount: PropTypes.func.isRequired,
  editAccount: PropTypes.func.isRequired,
};

export { EditBankInformation };

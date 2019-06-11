import React from 'react';
import { MDBBtn, MDBInput, MDBRow } from 'mdbreact';
import { EditableBankAccount } from './EditableBankAccount';

class EditBankInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: false,
      title: '',
      number: '',
      routingNumber: '',
      flagAccounts: false,
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
      flagAccounts: !prevState.flagAccounts,
      type: false,
      title: '',
      number: '',
      routingNumber: '',
    }));
  };

  render() {
    const { bankAccounts, onDelete, newAccount, editAccount } = this.props;
    let {
      type,
      title,
      number,
      routingNumber,
      flagAccounts,
    } = this.state;
    let style = {
      position: 'relative',
    };

    return (
      <React.Fragment>
        <div className="mt-3 mb-5">
          <h5>Bank Accounts</h5>
          {bankAccounts.map((account, i) => (
            <EditableBankAccount
              key={i}
              account={account}
              editAccount={editAccount}
              onDelete={onDelete}
            />
          ))}
          <div className="d-flex justify-content-center align-items-center">
            <MDBBtn
              onClick={() => this.changeFlag()}
              className="btn btn-circle">
              Add Accounts
            </MDBBtn>
          </div>
          {flagAccounts ? (
            <div>
              <h5>New Account</h5>
              <MDBRow className="d-flex justify-content-around align-items-center mb-3">
                <MDBInput
                  label="Business Account"
                  className="mt-0"
                  type="checkbox"
                  name="type"
                  onChange={this.onChangeBank}
                  style={style}
                  checked={type}
                />
                <MDBInput
                  label="Holder's name"
                  className="mt-0"
                  type="text"
                  name="title"
                  value={title}
                  onChange={this.onChangeBank}
                />
                <MDBInput
                  label="Account number"
                  className="mt-0"
                  type="text"
                  name="number"
                  value={number}
                  onChange={this.onChangeBank}
                />
                <MDBInput
                  label="Routing number"
                  className="mt-0"
                  type="text"
                  name="routingNumber"
                  value={routingNumber}
                  onChange={this.onChangeBank}
                />
                <MDBBtn
                  onClick={() => {
                    newAccount(this.state);
                    this.changeFlag();
                  }}
                  className="btn btn-circle">
                  Add
                </MDBBtn>
              </MDBRow>
            </div>
          ) : (
              <div></div>
            )}
        </div>
      </React.Fragment>
    );
  }
}

export default EditBankInformation;
